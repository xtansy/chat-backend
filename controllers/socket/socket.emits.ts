import { io } from "../../server"
import { ServerToClientEvents } from "../../@types/socket";

export const createDialogEmit = () => {
    io.emit("createDialog", { text: "New dialog was created" })
}

export const deleteDialogEmit = ({ dialogId }: { dialogId: string }) => {
    io.in(dialogId).emit("deleteDialog", { text: "Dialog was deleted" })
}

export const messageEmit: ServerToClientEvents["message"] = ({ dialogId, message }) => {
    io.in(dialogId).emit("message", { dialogId, message })
}