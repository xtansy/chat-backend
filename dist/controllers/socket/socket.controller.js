"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.socketOnConnect = void 0;
const models_1 = require("../../models");
const socket_emits_1 = require("./socket.emits");
const cloudinary_services_1 = require("../../utils/cloudinary/cloudinary.services");
const helpers_1 = require("../../utils/helpers");
const socketIdAndUserId_1 = require("./socketIdAndUserId");
const socketOnConnect = (socket) => {
    // join
    socket.on("join", ({ dialogIds, userId }) => {
        socket.join(dialogIds);
        socketIdAndUserId_1.userIdAndSocketId.set(userId, socket.id);
    });
    // chatting 
    socket.on("message", async ({ dialogId, message, userId }) => {
        const response = await (0, cloudinary_services_1.cloudinaryUploadImages)(message.imagesFiles);
        const urls = response.map(item => item.url);
        const messageDb = await models_1.db.message.create({ text: message.text, userId, photos: urls });
        const dialog = await models_1.db.dialog.findById(dialogId).exec();
        dialog?.messages.push(messageDb);
        dialog?.save();
        (0, socket_emits_1.messageEmit)({ dialogId, message: messageDb });
    });
    socket.on("disconnect", () => {
        const userIds = (0, helpers_1.getUserIdsArrBySocketId)(socketIdAndUserId_1.userIdAndSocketId, socket.id);
        userIds.forEach(id => socketIdAndUserId_1.userIdAndSocketId.delete(id));
    });
};
exports.socketOnConnect = socketOnConnect;
