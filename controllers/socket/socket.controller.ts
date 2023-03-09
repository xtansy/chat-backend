import { Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

import { db } from "../../models";
import { messageEmit } from "./socket.emits";
import { cloudinaryUploadImages } from "../../utils/cloudinary/cloudinary.services";
import { getUserIdsArrBySocketId } from "../../utils/helpers";
import { userIdAndSocketId } from "./socketIdAndUserId";
import { ClientToServerEvents, ServerToClientEvents } from "../../@types/socket";

export const socketOnConnect = (socket: Socket<ClientToServerEvents, ServerToClientEvents, DefaultEventsMap, any>) => {

    // join
    socket.on("join", ({ dialogIds, userId }) => {
        socket.join(dialogIds);
        userIdAndSocketId.set(userId, socket.id);
    })


    // chatting 
    socket.on("message", async ({ dialogId, message, userId }) => {

        const response = await cloudinaryUploadImages(message.imagesFiles)

        const urls = response.map(item => item.url);

        const messageDb = await db.message.create({ text: message.text, userId, photos: urls });
        const dialog = await db.dialog.findById(dialogId).exec();
        dialog?.messages.push(messageDb);
        dialog?.save();

        messageEmit({ dialogId, message: messageDb });
    })

    socket.on("disconnect", () => {
        const userIds = getUserIdsArrBySocketId(userIdAndSocketId, socket.id);
        userIds.forEach(id => userIdAndSocketId.delete(id));
    })

}