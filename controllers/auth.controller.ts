import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import { authConfig } from "../config/auth.config";
import { db } from "../models";
import { Response, Request } from "express";
import { UserModel } from "../@types/";
import { filterUser } from "../utils/helpers";

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

        const data: Omit<UserModel, "_id"> = {
            login,
            email,
            name,
            surname,
            password: bcrypt.hashSync(password, 8),
            role: role._id,
            avatar: ""
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
export const signin = async (req: Request, res: Response) => {
    const login: string = req.body.login;
    const password: string = req.body.password;

    const data = await db.user.findOne({ login }).populate("role").exec();

    if (!data) {
        res.status(404).json({
            message: "User not found"
        })
        return;
    }

    const passwordIsValid = bcrypt.compareSync(password, data.password);

    if (!passwordIsValid) {
        return res.status(401).send({
            message: "Invalid Password!",
        });
    }

    const token = jwt.sign({ id: data._id }, authConfig.secret, {
        expiresIn: 86400, // 24 hours
    });


    res.status(200).send({
        message: "Succes Login!",
        data: filterUser(data),
        accessToken: token,
    });
};
