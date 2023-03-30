"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_config_1 = require("../config/auth.config");
const verifyToken = (req, res, next) => {
    const token = req.headers["x-access-token"];
    if (!token) {
        return res.status(403).json({ message: "No token provided" });
    }
    // jwt по токену определит нужный объект с _id юзера, который мы создаем в signin
    // суем этот id в req.body.userId и бекенд понимает с каким юзером работаем
    jsonwebtoken_1.default.verify(token, auth_config_1.authConfig.secret, (err, decoded) => {
        if (err || !decoded) {
            return res.status(401).json({ message: "Unauthorized!" });
        }
        // if (typeof decoded !== "string") {
        req.body.userId = decoded.id;
        next();
        // } else {
        // return res.status(403).send({ message: "Decoded error" });
        // }
    });
};
exports.verifyToken = verifyToken;
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
