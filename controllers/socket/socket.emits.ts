import { ServerToClientEvents } from "../../@types/socket";
import { io } from "../../server"
import { userIdAndSocketId } from "./socketIdAndUserId";

export const createDialogEmit = ({ userId, partnerId }: { userId: string, partnerId: string }) => {
    const userSocketId = userIdAndSocketId.get(userId);
    const partnerSocketId = userIdAndSocketId.get(partnerId);

    if (userSocketId) {
        io.in(userSocketId).emit("createDialog", { text: "New dialog was created" })
    }

    if (partnerSocketId) {
        io.in(partnerSocketId).emit("createDialog", { text: "New dialog was created" })
    }

}

export const deleteDialogEmit = ({ dialogId }: { dialogId: string }) => {
    io.in(dialogId).emit("deleteDialog", { text: "Dialog was deleted" })
}

export const messageEmit: ServerToClientEvents["message"] = ({ dialogId, message }) => {
    io.in(dialogId).emit("message", { dialogId, message })
}