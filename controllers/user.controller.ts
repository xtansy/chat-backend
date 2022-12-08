import { Request, Response } from "express";
import { db } from "../models";

export const index = async (req: Request, res: Response) => {
    try {
        const users = await db.user.find({}).populate("role").exec();
        res.json({
            status: "success",
            data: users,
        });
    } catch (error) {
        res.json({
            status: "error",
            data: JSON.stringify(error),
        });
    }
};


export const getMe = async (req: any, res: Response) => {
    const userId = req.userId;
    db.user.findById(userId).populate("role").exec(((err, user) => {
        if (err || !user) {
            res.status(404).json({
                message: "User not found"
            })
            return;
        }
        res.json({
            message: "success",
            data: user,
        });
    }));

};

export const deleteAll = (req: any, res: Response) => {
    db.user.deleteMany({}).exec((err) => {
        if (err) {
            res.status(403).json({
                message: "Cannot delete all users",
                error: err
            })
            return;
        }
        res.status(200).json({
            status: "succes",
            message: "All users has been deleted"
        });
    })
};

export const allAccess = (req: Request, res: Response) => {
    res.status(200).send("Public Content.");
};

export const userBoard = (req: Request, res: Response) => {
    res.status(200).send("User Content.");
};

export const adminBoard = (req: Request, res: Response) => {
    res.status(200).send("Admin Content.");
};

export const moderatorBoard = (req: Request, res: Response) => {
    res.status(200).send("Moderator Content.");
};

