"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = void 0;
const mongoose_1 = require("mongoose");
exports.Message = (0, mongoose_1.model)("Message", new mongoose_1.Schema({
    text: {
        required: true,
        type: String
    },
    userId: {
        required: true,
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User"
    },
    photos: [{ type: String }]
}, {
    versionKey: false,
    timestamps: {
        createdAt: true,
        updatedAt: false
    },
}));
