import { io } from "../../server"

export const createDialogEmit = () => {
    io.emit("createDialog", { text: "New dialog was created" })
}