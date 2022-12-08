import { Response, Request } from "express";
import { db } from "../models";

export const deleteAll = (req: Request, res: Response) => {
    db.role.deleteMany({}).exec((err) => {
        if (err) {
            res.status(403).json({
                message: "Cannot delete all roles",
                error: err
            })
            return;
        }
        res.status(200).json({
            status: "succes",
            message: "All Roles has been deleted"
        });
    })
};
export const index = async (req: Request, res: Response) => {
    try {
        const roles = await db.role.find({}).exec();
        res.json({
            status: "success",
            data: roles,
        });
    } catch (error) {
        res.json({
            status: "error",
            data: JSON.stringify(error),
        });
    }
};