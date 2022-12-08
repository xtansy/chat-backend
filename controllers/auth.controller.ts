import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import { authConfig } from "../config/auth.config";
import { db } from "../models";
import { Response, Request } from "express";
import { UserModel } from "../@types/";
import { UserModelDocument } from "../models/user.model";
import { findOneCollection, Collections } from "../utils/mongodb";
import { Model } from "mongoose";

const User = db.user;
const Role = db.role;

export const signup = (req: Request, res: Response) => {
    const login: string = req.body.login;
    const name: string = req.body.name;
    const surname: string = req.body.surname;

    const email: string = req.body.email;
    const password: string = req.body.password;

    Role.findOne({ name: "user" }).exec((err, role) => {
        if (!role || err) {
            res.status(500).send({ message: err });
            return;
        }

        const data: UserModel = {
            login,
            email,
            name,
            surname,
            password: bcrypt.hashSync(password, 8),
            role: role._id,
        };

        const user = new User(data);

        user.save((err, user) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            res.send({
                message: "User was registered successfully!",
                data: {
                    _id: user._id,
                    login: user.login,
                    name: user.name,
                    surname: user.surname,
                    email: user.email,
                },
            });
        });
    });
};
export const signin = (req: Request, res: Response) => {
    const login: string = req.body.login;
    const password: string = req.body.password;

    // findOneCollection({
    //     model: User,
    //     filter: {
    //         username,
    //     },
    // });

    User.findOne({
        login,
    }).exec(async (err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (!user) {
            return res.status(404).send({ message: "User Not found." });
        }

        const passwordIsValid = bcrypt.compareSync(password, user.password);

        if (!passwordIsValid) {
            return res.status(401).send({
                message: "Invalid Password!",
            });
        }

        const token = jwt.sign({ id: user.id }, authConfig.secret, {
            expiresIn: 86400, // 24 hours
        });

        res.status(200).send({
            message: "Succes Login!",
            data: await user.populate("role"),
            accessToken: token,
        });
    });
};
