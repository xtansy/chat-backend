"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signin = exports.signup = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const auth_config_1 = require("../config/auth.config");
const models_1 = require("../models");
const User = models_1.db.user;
const Role = models_1.db.role;
const signup = (req, res) => {
    const { login, name, surname, email, password } = req.body;
    Role.findOne({ name: "user" }).exec((err, role) => {
        if (!role || err) {
            res.status(500).send({ message: err });
            return;
        }
        const data = {
            login,
            email,
            name,
            surname,
            password: bcryptjs_1.default.hashSync(password, 8),
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
exports.signup = signup;
const signin = async (req, res) => {
    const { login, password } = req.body;
    User.findOne({ login }).populate("role").exec((err, data) => {
        if (err || !data) {
            return res.status(404).json({
                message: "Пользователь не найден!"
            });
        }
        const passwordIsValid = bcryptjs_1.default.compareSync(password, data.password);
        if (!passwordIsValid) {
            return res.status(401).json({
                message: "Неверный пароль!",
            });
        }
        const token = jsonwebtoken_1.default.sign({ id: data._id }, auth_config_1.authConfig.secret, {
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
exports.signin = signin;
