import { Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { authConfig } from "../config/auth.config";
import { db } from "../models";

const { user, role } = db;

export const verifyToken = (
    req: Request & { userId: string | JwtPayload },
    res: Response,
    next: () => void
) => {
    const token = req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send({ message: "No token provided" });
    }

    jwt.verify(token as string, authConfig.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: "Unauthorized!" });
        }
        if (decoded) {
            req.userId = decoded;
            next();
        }
    });
};
