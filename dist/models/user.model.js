"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
exports.User = (0, mongoose_1.model)("User", new mongoose_1.Schema({
    name: {
        required: true,
        type: String,
    },
    surname: {
        required: true,
        type: String,
    },
    login: {
        required: true,
        type: String,
    },
    email: {
        required: true,
        type: String,
    },
    password: {
        required: true,
        type: String,
    },
    role: {
        required: true,
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Role",
    },
    avatar: String
}, {
    versionKey: false
}));
