import { Request, Response } from "express";
import { db } from "../models";

const index = async (req: Request, res: Response) => {
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

const allAccess = (req: Request, res: Response) => {
    res.status(200).send("Public Content.");
};

const userBoard = (req: Request, res: Response) => {
    res.status(200).send("User Content.");
};

const adminBoard = (req: Request, res: Response) => {
    res.status(200).send("Admin Content.");
};

const moderatorBoard = (req: Request, res: Response) => {
    res.status(200).send("Moderator Content.");
};

export { allAccess, userBoard, adminBoard, moderatorBoard, index };
