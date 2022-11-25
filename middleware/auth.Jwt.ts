import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { authConfig } from "../config/auth.config";

export const verifyToken = (req: any, res: Response, next: () => void) => {
    const token = req.headers["x-access-token"] as string;

    if (!token) {
        return res.status(403).send({ message: "No token provided" });
    }

    // jwt по токену определит нужный объект с _id юзера, который мы создаем в signin
    // суем этот id в req.userId и бекенд понимает с каким юзером работаем
    jwt.verify(token, authConfig.secret, (err, decoded: any) => {
        if (err) {
            return res.status(401).send({ message: "Unauthorized!" });
        }
        req.userId = decoded.id;
        next();
    });
};

// const isAdmin = (
//     req: Request & { userId: string },
//     res: Response,
//     next: () => void
// ) => {
//     user.findById(req.userId).exec((err, user) => {
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
