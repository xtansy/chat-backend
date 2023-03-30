"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dialog = void 0;
const mongoose_1 = require("mongoose");
exports.Dialog = (0, mongoose_1.model)("Dialog", new mongoose_1.Schema({
    owner: {
        required: true,
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User"
    },
    partner: {
        required: true,
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User"
    },
    messages: [{
            required: true,
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Message"
        }],
    // lastMessage: {
    //     required: true,
    //     type: Schema.Types.ObjectId,
    //     ref: "Message"
    // }
}, {
    versionKey: false
}));
