"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeUserPasswordValidation = exports.changeUserInfoValidation = void 0;
const utils_1 = require("./utils");
exports.changeUserInfoValidation = [
    (0, utils_1.fieldValidate)("login", "логин", { min: 3, max: 16 }),
    (0, utils_1.fieldValidate)("name", "имя", { min: 3, max: 15 }),
    (0, utils_1.fieldValidate)("surname", "фамилия", { min: 3, max: 15 }),
    (0, utils_1.fieldValidate)("email", "почта", { min: 5, max: 20 }).isEmail().withMessage("Неверный E-Mail"),
];
exports.changeUserPasswordValidation = [
    (0, utils_1.fieldValidate)("oldPassword", "пароль", { min: 6, max: 20 }),
    (0, utils_1.fieldValidate)("newPassword", "пароль", { min: 6, max: 20 }),
    (0, utils_1.fieldValidate)("newPasswordConfirmed", "подтверждение", { min: 6, max: 20 }).custom((value, { req }) => {
        if (value !== req.body.newPassword) {
            throw new Error('Пароли не совпадают');
        }
        return true;
    }),
];
