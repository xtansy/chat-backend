import { Request, Response } from "express";

import { db } from "../models";

export const index = async (req: Request, res: Response) => {
    db.message.find({}).populate("userId").exec((err, messages) => {
        if (err || !messages) {
            res.status(403).json({
                message: "Сообщения не найдены!",
                error: err
            })
            return;
        }
        res.json({
            status: "Сообщения успешно найдены!",
            data: messages,
        });
    });
};

export const deleteAll = (req: Request, res: Response) => {
    db.message.deleteMany({}).exec((err) => {
        if (err) {
            res.status(403).json({
                message: "Cannot delete all messages",
                error: err
            })
            return;
        }
        res.status(200).json({
            status: "succes",
            message: "All messages has been deleted"
        });
    })
};