import { Request, Response } from "express";
import { DialogModel } from "../@types";
import { findUser } from "../utils/mongodb";
import { db } from "../models";

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
const index =  (req: any, res: Response) => {
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
        .exec( (err, dialogs) =>{
            if (err) {
                return res.status(404).json({
                message: 'Dialogs not found',
                });
            }
            return res.json(dialogs);
        });
    
};
const createDialog = async (req: any, res: Response) => {
    const userId = req.userId;
    const partnerId = req.body.partnerId;
    const ownerData = await findUser(userId);

    if (ownerData.isError || !ownerData.data) {
        res.send(403).json({error: ownerData.isError})
        return;
    }

    const partnerData = await findUser(partnerId);

    if (partnerData.isError || !partnerData.data) {
        res.send(403).json({error: partnerData.isError})
        return;
    }

    const dialogData: DialogModel = {
        owner: ownerData.data,
        partner: partnerData.data,
        lastMessage: "",
        messages: []
    }

    await db.dialog.create(dialogData);

    res.status(200).json({
        status: "succes",
        data: dialogData
    })
};


export { getMyDialogs, createDialog, index };