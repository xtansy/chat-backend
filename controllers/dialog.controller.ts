import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { DialogModel } from "../@types";
import { db } from "../models";
import { filterUser, filterDialog } from "../utils/helpers/";
import { createDialogEmit, deleteDialogEmit } from "./socket/socket.emits";

export const deleteAll = (req: any, res: Response) => {
    db.dialog.deleteMany({}).exec((err) => {
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

export const deleteDialog = async (req: any, res: Response) => {
    const userId = req.userId;
    const dialogId = req.params.dialogId;

    const dialog = await db.dialog.findById(dialogId);

    if (!dialog) {
        return res.status(404).json({
            message: "Диалог не найден",
        });
    }

    db.dialog.deleteOne(
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
            deleteDialogEmit();
            return res.status(200).json({
                message: "Диалог был удален!",
            });
        }
    )
}

export const index = (req: any, res: Response) => {
    db.dialog.find({}).populate(["owner", "partner", "messages"]).exec((err, dialogs) => {
        if (err || !dialogs) {
            res.status(403).json({
                message: "Not found dialogs",
                error: err
            })
            return;
        }
        res.json({
            status: "success",
            data: dialogs,
        });
    });

};

export const getMyDialogs = (req: any, res: Response) => {
    const userId = new ObjectId(req.userId);

    db.dialog.find()
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
    const userId = req.userId;

    const partnerLogin = req.body.partnerLogin;

    const owner = await db.user.findById(userId).populate("role").exec();

    if (!owner) {
        res.status(404).json({
            message: "Owner not found"
        })
        return;
    }

    if (owner.login === partnerLogin) {
        res.status(401).json({
            message: "Нельзя создать диалог с самим собой"
        })
        return;
    }

    const partner = await db.user.findOne({ login: partnerLogin }).populate("role").exec();

    if (!partner) {
        res.status(404).json({
            message: "Партнер не найден!"
        })
        return;
    }



    const createdDialog = await db.dialog.findOne({
        $and: [{ owner }, { partner }]
    }).exec();


    if (createdDialog) {
        res.status(401).json({
            message: "Dialog is already created"
        })
        return;
    }
    // const message = await db.message.create({ text: "", userId: owner._id });
    const dialog: DialogModel = {
        owner,
        partner,
        // lastMessage: message,
        messages: []
    }

    const response = await db.dialog.create(dialog);

    createDialogEmit();

    res.status(200).json({
        message: "Dialog was created!",
        data: response
    })
};
