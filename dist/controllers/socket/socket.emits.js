"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageEmit = exports.deleteDialogEmit = exports.createDialogEmit = void 0;
const server_1 = require("../../server");
const socketIdAndUserId_1 = require("./socketIdAndUserId");
const createDialogEmit = ({ userId, partnerId }) => {
    const userSocketId = socketIdAndUserId_1.userIdAndSocketId.get(userId);
    const partnerSocketId = socketIdAndUserId_1.userIdAndSocketId.get(partnerId);
    if (userSocketId) {
        server_1.io.in(userSocketId).emit("createDialog", { text: "New dialog was created" });
    }
    if (partnerSocketId) {
        server_1.io.in(partnerSocketId).emit("createDialog", { text: "New dialog was created" });
    }
};
exports.createDialogEmit = createDialogEmit;
const deleteDialogEmit = ({ dialogId }) => {
    server_1.io.in(dialogId).emit("deleteDialog", { text: "Dialog was deleted" });
};
exports.deleteDialogEmit = deleteDialogEmit;
const messageEmit = ({ dialogId, message }) => {
    server_1.io.in(dialogId).emit("message", { dialogId, message });
};
exports.messageEmit = messageEmit;
