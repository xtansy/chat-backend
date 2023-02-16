import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { DialogModel } from "../@types";
import { db } from "../models";
import { createDialogEmit, deleteDialogEmit } from "./socket/socket.emits";


const Dialog = db.dialog;
const Message = db.message;
const User = db.user;

export const deleteAll = (req: Request, res: Response) => {
    Dialog.deleteMany({}).exec((err) => {
        if (err) {
            res.status(403).json({
                message: "Cannot delete all dialogs",
                error: err
            })
            return;
        }
        res.status(200).json({
            status: "succes",
            message: "All dialogs has been deleted"
        });
    })
};

export const deleteDialog = async (req: Request, res: Response) => {
    const userId = req.body.userId;
    const dialogId = req.params.dialogId;

    Dialog.findById(dialogId).exec((err, dialog) => {
        if (err || !dialog) {
            return res.status(404).json({
                message: "Диалог не найден",
            });
        }

        dialog.messages.forEach(async (mes) => {
            await Message.deleteOne({ _id: mes._id });
        })

        Dialog.deleteOne(
            {
                $or: [{ owner: userId }, { partner: userId }],
                $and: [{ _id: dialogId }]
            },
            (err) => {
                if (err) {
                    return res.status(401).json({
                        message: "Диалог не был удален",
                        error: err
                    });
                }
                deleteDialogEmit({ dialogId: String(dialog._id) });
                return res.status(200).json({
                    message: "Диалог был удален!",
                });
            }
        )
    })
}

export const index = (req: Request, res: Response) => {
    Dialog.find({}).populate(["owner", "partner", "messages"]).exec((err, dialogs) => {
        if (err || !dialogs) {
            return res.status(403).json({
                message: "Not found dialogs",
                error: err
            })
        }
        res.json({
            status: "success",
            data: dialogs,
        });
    });
};

export const getMyDialogs = (req: Request, res: Response) => {
    const userId = new ObjectId(req.body.userId);

    Dialog.find()
        .or([{ owner: userId }, { partner: userId }])
        .populate(['owner', 'partner', "messages"])
        .exec((err, dialogs) => {
            if (err) {
                return res.status(404).json({
                    message: 'Dialogs not found',
                });
            }
            return res.json({
                message: "Dialogs founded!",
                data: dialogs
            });
        });
};

export const createDialog = async (req: any, res: Response) => {

    const { userId, partnerLogin } = req.body;

    User.findById(userId).populate("role").exec((err, owner) => {
        if (err || !owner) {
            return res.status(404).json({
                message: "Owner not found"
            })
        }

        if (owner.login === partnerLogin) {
            return res.status(401).json({
                message: "Нельзя создать диалог с самим собой"
            })
        }

        User.findOne({ login: partnerLogin }).populate("role").exec((err, partner) => {
            if (err || !partner) {
                return res.status(404).json({
                    message: "Партнер не найден!"
                })
            }

            Dialog.findOne({
                $and: [{ owner }, { partner }]
            }).exec((err, createdDialog) => {
                if (createdDialog) {
                    return res.status(401).json({
                        message: "Dialog is already created"
                    })
                }
            });

            const dialog: DialogModel = {
                owner,
                partner,
                messages: []
            }

            const response = new Dialog(dialog);

            response.save((err, resp) => {
                if (err || !resp) {
                    return res.status(401).json({
                        message: err,
                    })
                }

                createDialogEmit();

                res.status(200).json({
                    message: "Dialog was created!",
                    data: resp
                })
            })
        });
    });
};
