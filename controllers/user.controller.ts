import { Request, Response } from "express";
import { db } from "../models";
import {
    cloudinaryUploadImage,
    cloudinaryDeleteImage,
} from "../utils/cloudinary/cloudinary.services";
import bcrypt from "bcryptjs";

const User = db.user;

export const index = async (req: Request, res: Response) => {
    try {
        const users = await User.find({}).populate("role").exec();
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

export const getMe = async (req: Request, res: Response) => {
    const userId = req.body.userId;
    User.findById(userId)
        .populate(["role", "friends"])
        .exec((err, user) => {
            if (err || !user) {
                return res.status(404).json({
                    message: "User not found",
                });
            }
            res.json({
                message: "success",
                data: user,
            });
        });
};

export const getUserById = async (req: Request, res: Response) => {
    const userId = req.params.userId;
    User.findById(userId)
        .populate("role")
        .exec((err, user) => {
            if (err || !user) {
                return res.status(404).json({
                    message: "User not found",
                });
            }
            res.json({
                message: "success",
                data: user,
            });
        });
};

export const deleteAll = (req: Request, res: Response) => {
    User.deleteMany({}).exec((err) => {
        if (err) {
            return res.status(403).json({
                message: "Cannot delete all users",
                error: err,
            });
        }
        res.status(200).json({
            status: "succes",
            message: "All users has been deleted",
        });
    });
};

export const uploadAvatar = async (req: Request, res: Response) => {
    const userId = req.body.userId;

    if (!req.file) {
        return res.status(400).json({
            message: "Нет файла!",
        });
    }
    const buffer = req.file.buffer;

    const response = await cloudinaryUploadImage(buffer);

    User.findById(userId).exec(async (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                message: "Произошла ошибка!",
            });
        }

        if (user.avatar) {
            await cloudinaryDeleteImage(user.avatar);
        }

        user.avatar = response.url;

        await user.save();

        return res.status(200).json({
            message: "Загрузил",
            url: response.url,
        });
    });
};

export const deleteAvatar = async (req: Request, res: Response) => {
    const userId = req.body.userId;

    User.findById(userId).exec(async (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                message: "Произошла ошибка"!,
            });
        }
        user.avatar = "";
        await user.save();
        return res.status(200).json({
            message: "Удалил",
        });
    });
};

export const changeUserInfo = async (req: Request, res: Response) => {
    const email: string = req.body.email;
    const login: string = req.body.login;
    const name: string = req.body.name;
    const surname: string = req.body.surname;

    const userId = req.body.userId;

    User.findById(userId).exec(async (err, user) => {
        if (err || !user) {
            return res.status(404).json({
                message: "Пользователь не изменен!",
            });
        }

        user.email = email;
        user.name = name;
        user.login = login;
        user.surname = surname;

        await user.save();

        return res.status(200).json({
            message: "Пользователь успешно обновлён!",
        });
    });
};

export const changeUserPassword = async (req: Request, res: Response) => {
    const oldPassword: string = req.body.oldPassword;
    const newPassword: string = req.body.newPassword;

    const userId = req.body.userId;

    User.findById(userId).exec(async (err, user) => {
        if (err || !user) {
            return res.status(404).json({
                message: "Пароль не изменен!",
            });
        }

        const passwordIsValid = bcrypt.compareSync(oldPassword, user.password);
        if (!passwordIsValid) {
            return res.status(401).send({
                message: "Неверный пароль!",
            });
        }

        user.password = bcrypt.hashSync(newPassword, 8);

        await user.save();

        return res.status(200).json({
            message: "Пароль успешно обновлён!",
        });
    });
};

export const addFriend = async (req: Request, res: Response) => {
    const { userId, partnerId } = req.body;

    const user = await User.findById(userId);

    if (!user) {
        return res.status(404).json({
            message: "Пользователь не найден",
        });
    }

    const partner = await User.findById(partnerId);
    if (!partner) {
        return res.status(404).json({
            message: "Партнер не найден",
        });
    }

    user.friends.push(partner);
    partner.friends.push(user);

    await user.save();
    await partner.save();

    return res.status(200).json({
        message: "Пользователь добавлен в друзья!",
    });
};


export const removeFriend = async (req: Request, res: Response) => {
    const { userId, partnerId } = req.body;

    const user = await User.findById(userId);

    if (!user) {
        return res.status(404).json({
            message: "Пользователь не найден",
        });
    }

    const partner = await User.findById(partnerId);
    if (!partner) {
        return res.status(404).json({
            message: "Партнер не найден",
        });
    }

    user.friends = user.friends.filter(item => String(item._id) !== String(partner._id));
    partner.friends = partner.friends.filter(item => String(item._id) !== String(user._id));

    await user.save();
    await partner.save();

    return res.status(200).json({
        message: "Пользователь удален из друзей!",
    });
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
