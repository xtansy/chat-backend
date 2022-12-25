import { Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

import { ClientToServerEvents, ServerToClientEvents } from "../../@types/socket";
import { db } from "../../models";
import { io } from "../../server";

export const socketOnConnect = (socket: Socket<ClientToServerEvents, ServerToClientEvents, DefaultEventsMap, any>) => {

    // join

    socket.on("join", (dialogIds) => {
        socket.join(dialogIds)
    })


    // chatting 
    socket.on("message", async ({ dialogId, message }) => {
        const dialog = await db.dialog.findById(dialogId).exec();
        dialog?.messages.push(message);
        dialog?.save();
        // socket.in(dialogId).emit("message", { dialogId, message })
        io.in(dialogId).emit("message", { dialogId, message })
    })
}
