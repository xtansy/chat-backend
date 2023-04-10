"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.moderatorBoard = exports.adminBoard = exports.userBoard = exports.allAccess = exports.changeUserPassword = exports.changeUserInfo = exports.deleteAvatar = exports.uploadAvatar = exports.deleteAll = exports.getMe = exports.index = void 0;
const models_1 = require("../models");
const cloudinary_services_1 = require("../utils/cloudinary/cloudinary.services");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const User = models_1.db.user;
const index = async (req, res) => {
    try {
        const users = await User.find({}).populate("role").exec();
        res.json({
            message: "success",
            data: users,
        });
    }
    catch (error) {
        res.json({
            message: "error",
            data: JSON.stringify(error),
        });
    }
};
exports.index = index;
const getMe = async (req, res) => {
    const userId = req.body.userId;
    User.findById(userId).populate("role").exec(((err, user) => {
        if (err || !user) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        res.json({
            message: "success",
            data: user,
        });
    }));
};
exports.getMe = getMe;
const deleteAll = (req, res) => {
    User.deleteMany({}).exec((err) => {
        if (err) {
            return res.status(403).json({
                message: "Cannot delete all users",
                error: err
            });
        }
        res.status(200).json({
            status: "succes",
            message: "All users has been deleted"
        });
    });
};
exports.deleteAll = deleteAll;
const uploadAvatar = async (req, res) => {
    const userId = req.body.userId;
    if (!req.file) {
        return res.status(400).json({
            message: "Нет файла!"
        });
    }
    const buffer = req.file.buffer;
    const response = await (0, cloudinary_services_1.cloudinaryUploadImage)(buffer);
    User.findById(userId).exec(async (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                message: "Произошла ошибка!",
            });
        }
        await (0, cloudinary_services_1.cloudinaryDeleteImage)(user.avatar);
        user.avatar = response.url;
        await user.save();
        return res.status(200).json({
            message: "Загрузил",
            url: response.url
        });
    });
};
exports.uploadAvatar = uploadAvatar;
const deleteAvatar = async (req, res) => {
    const userId = req.body.userId;
    User.findById(userId).exec(async (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                message: "Произошла ошибка"
            });
        }
        user.avatar = "";
        await user.save();
        return res.status(200).json({
            message: "Удалил",
        });
    });
};
exports.deleteAvatar = deleteAvatar;
const changeUserInfo = async (req, res) => {
    const email = req.body.email;
    const login = req.body.login;
    const name = req.body.name;
    const surname = req.body.surname;
    const userId = req.body.userId;
    User.findById(userId).exec(async (err, user) => {
        if (err || !user) {
            return res.status(404).json({
                message: "Пользователь не изменен!"
            });
        }
        user.email = email;
        user.name = name;
        user.login = login;
        user.surname = surname;
        await user.save();
        return res.status(200).json({
            message: "Пользователь успешно обновлён!"
        });
    });
};
exports.changeUserInfo = changeUserInfo;
const changeUserPassword = async (req, res) => {
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;
    const userId = req.body.userId;
    User.findById(userId).exec(async (err, user) => {
        if (err || !user) {
            return res.status(404).json({
                message: "Пароль не изменен!"
            });
        }
        const passwordIsValid = bcryptjs_1.default.compareSync(oldPassword, user.password);
        if (!passwordIsValid) {
            return res.status(401).send({
                message: "Неверный пароль!",
            });
        }
        user.password = bcryptjs_1.default.hashSync(newPassword, 8);
        await user.save();
        return res.status(200).json({
            message: "Пароль успешно обновлён!"
        });
    });
};
exports.changeUserPassword = changeUserPassword;
const allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};
exports.allAccess = allAccess;
const userBoard = (req, res) => {
    res.status(200).send("User Content.");
};
exports.userBoard = userBoard;
const adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
};
exports.adminBoard = adminBoard;
const moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
};
exports.moderatorBoard = moderatorBoard;
