"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const user_model_1 = require("./user.model");
const role_model_1 = require("./role.model");
const dialog_model_1 = require("./dialog.model");
const message_model_1 = require("./message.model");
mongoose_1.default.Promise = global.Promise;
exports.db = {
    mongoose: mongoose_1.default,
    user: user_model_1.User,
    role: role_model_1.Role,
    ROLES: ["user", "admin", "moderator"],
    dialog: dialog_model_1.Dialog,
    message: message_model_1.Message
};
