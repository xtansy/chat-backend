"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fieldValidate = void 0;
const express_validator_1 = require("express-validator");
const fieldValidate = (field, name, { min, max }) => {
    return (0, express_validator_1.body)(field, `Поле ${name} обязательно!`)
        .isString()
        .isLength({ min, max })
        .withMessage(`Неверная длина поля ${name}`);
};
exports.fieldValidate = fieldValidate;
