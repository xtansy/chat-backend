import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { authConfig } from "../config/auth.config";

export const verifyToken = (req: Request, res: Response, next: () => void) => {
    const token = req.headers["x-access-token"] as string;

    if (!token) {
        return res.status(403).send({ message: "No token provided" });
    }

    // jwt по токену определит нужный объект с _id юзера, который мы создаем в signin
    // суем этот id в req.body.userId и бекенд понимает с каким юзером работаем
    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if (err || !decoded) {
            return res.status(401).send({ message: "Unauthorized!" });
        }
        if (typeof decoded !== "string") {
            req.body.userId = decoded.id;
            next();
        } else {
            return res.status(403).send({ message: "Decoded error" });
        }
    });
};

// const isAdmin = (
//     req: Request & { userId: string },
//     res: Response,
//     next: () => void
// ) => {
//     user.findById(req.body.userId).exec((err, user) => {
//         if (err) {
//             res.status(500).send({ message: err });
//             return;
//         }

//         role.findById({ id: user?.role }).exec((err, role) => {
//             if (err || !role) {
//                 res.status(500).send({ message: err });
//                 return;
//             }

//         });

//     });
// };
