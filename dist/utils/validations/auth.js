"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signInValidation = exports.signUpValidation = void 0;
const utils_1 = require("./utils");
exports.signUpValidation = [
    (0, utils_1.fieldValidate)("login", "логин", { min: 3, max: 16 }),
    (0, utils_1.fieldValidate)("name", "имя", { min: 3, max: 15 }),
    (0, utils_1.fieldValidate)("surname", "фамилия", { min: 3, max: 15 }),
    (0, utils_1.fieldValidate)("password", "пароль", { min: 6, max: 20 }),
    (0, utils_1.fieldValidate)("email", "почта", { min: 5, max: 20 }).isEmail().withMessage("Неверный E-Mail"),
    (0, utils_1.fieldValidate)("confirmPassword", "подтверждение", { min: 6, max: 20 }).custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Пароли не совпадают');
        }
        return true;
    }),
];
exports.signInValidation = [
    (0, utils_1.fieldValidate)("login", "логин", { min: 3, max: 16 }),
    (0, utils_1.fieldValidate)("password", "пароль", { min: 6, max: 20 }),
];
