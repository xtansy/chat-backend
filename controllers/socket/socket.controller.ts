import { Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

import { ClientToServerEvents, ServerToClientEvents } from "../../@types/socket";
import { db } from "../../models";

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
        socket.to(dialogId).emit("message", { dialogId, message })
    })
}

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzOWNlYWU3MDU4NTJkZDZiN2QwZGVlMCIsImlhdCI6MTY3MTIyODUyMiwiZXhwIjoxNjcxMzE0OTIyfQ.K3qJBkAxOEEb8kq-Hwi_TZJ2mS0UPXpBDfPIl1Cs41I
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzOWNlYjgwMDU4NTJkZDZiN2QwZGYwMCIsImlhdCI6MTY3MTIyODU0NCwiZXhwIjoxNjcxMzE0OTQ0fQ.C8TJFzYdIRveBthYVsqUMeDqf8rTkN2jHuTRUONbqcE