"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDialogValidation = void 0;
const utils_1 = require("./utils");
exports.createDialogValidation = [
    (0, utils_1.fieldValidate)("partnerLogin", "логин", { min: 3, max: 16 }),
];
