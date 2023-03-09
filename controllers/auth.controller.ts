import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import { authConfig } from "../config/auth.config";
import { db } from "../models";
import { Response, Request } from "express";
import { UserModel } from "../@types/models";

const User = db.user;
const Role = db.role;

export const signup = (req: Request, res: Response) => {

    const { login, name, surname, email, password }: Omit<UserModel, "_id" | "avatar" | "role"> = req.body;

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
                res.status(400).send({ message: err });
                return;
            }
            res.status(201).json({
                message: "Пользователь успешно создан!",
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

    const { login, password }: Pick<UserModel, "login" | "password"> = req.body;

    User.findOne({ login }).populate("role").exec((err, data) => {
        if (err || !data) {
            return res.status(404).json({
                message: "Пользователь не найден!"
            })
        }

        const passwordIsValid = bcrypt.compareSync(password, data.password);

        if (!passwordIsValid) {
            return res.status(401).json({
                message: "Неверный пароль!",
            });
        }

        const token = jwt.sign({ id: data._id }, authConfig.secret, {
            expiresIn: 86400, // 24 hours
        });

        res.status(200).json({
            message: "Вы успешно зашли!",
            data: {
                login: data.login,
                name: data.name,
                surname: data.surname,
                email: data.email,
                _id: data._id,
                role: data.role,
                avatar: data.avatar
            },
            accessToken: token,
        });
    });
};
