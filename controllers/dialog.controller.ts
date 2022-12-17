import { Request, Response } from "express";
import { DialogModel } from "../@types";
import { db } from "../models";
import { filterUser, filterDialog } from "../utils/helpers/";

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
const index = (req: any, res: Response) => {
    db.dialog.find({}).populate(["owner", "partner"]).exec((err, dialogs) => {
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
const getMyDialogs = (req: any, res: Response) => {
    const userId = req.userId;

    db.dialog.find()
        .or([{ author: userId }, { partner: userId }])
        .populate(['owner', 'partner'])
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

const createDialog = async (req: any, res: Response) => {
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
            message: "partner not found"
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

    const dialog: DialogModel = {
        owner,
        partner,
        lastMessage: "",
        messages: []
    }

    await db.dialog.create(dialog);

    res.status(200).json({
        message: "Dialog was created!",
        data: filterDialog(dialog)
    })
};

export { getMyDialogs, createDialog, index };