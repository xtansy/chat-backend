import { Request, Response } from "express";
import { db } from "../models";
import { findUserByLogin } from "../utils/mongodb";
import { cloudinaryUploadImage } from "../utils/cloudinary/cloudinary.services";
import bcrypt from "bcryptjs";

export const index = async (req: Request, res: Response) => {
    try {
        const users = await db.user.find({}).populate("role").exec();
        res.json({
            message: "success",
            data: users,
        });
    } catch (error) {
        res.json({
            message: "error",
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

export const getUser = async (req: Request, res: Response) => {
    const login = req.params.login;

    const { isError, data } = await findUserByLogin(login);

    if (isError || !data) {
        res.status(404).json(isError)
        return;
    }

    res.status(200).json({
        message: "User found!",
        data
    })
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


export const uploadAvatar = async (req: any, res: Response) => {

    if (!req.file) {
        return res.status(400).json({
            message: "Нет файла!"
        })
    }
    const buffer = req.file.buffer;

    const response = await cloudinaryUploadImage(buffer);

    const user = await db.user.findById(req.userId);

    if (user) {
        user.avatar = response.url;
        user.save();
        return res.status(200).json({
            message: "Загрузил",
            url: response.url
        })
    }

    return res.status(400).json({
        message: "Произошла ошибка"!
    })
};

export const deleteAvatar = async (req: any, res: Response) => {
    const user = await db.user.findById(req.userId);

    if (user) {
        user.avatar = "";
        user.save();
        return res.status(200).json({
            message: "Удалил",
        })
    }

    return res.status(400).json({
        message: "Произошла ошибка"!
    })
};

export const changeUserInfo = async (req: any, res: Response) => {
    const email: string = req.body.email;
    const login: string = req.body.login;
    const name: string = req.body.name;
    const surname: string = req.body.surname;

    const userId = req.userId;

    let user = await db.user.findById(userId);

    if (user) {

        user.email = email;
        user.name = name;
        user.login = login;
        user.surname = surname;

        await user.save();

        return res.status(200).json({
            message: "Пользователь успешно обновлён!"
        })
    }

    return res.status(404).json({
        message: "Пользователь не изменен!"
    })
};

export const changeUserPassword = async (req: any, res: Response) => {
    const oldPassword: string = req.body.oldPassword;
    const newPassword: string = req.body.newPassword;


    const userId = req.userId;

    let user = await db.user.findById(userId);

    if (user) {
        const passwordIsValid = bcrypt.compareSync(oldPassword, user.password);
        if (!passwordIsValid) {
            return res.status(401).send({
                message: "Неверный пароль!",
            });
        }

        user.password = bcrypt.hashSync(newPassword, 8)

        await user.save();

        return res.status(200).json({
            message: "Пароль успешно обновлён!"
        })
    }

    return res.status(404).json({
        message: "Пароль не изменен!"
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

