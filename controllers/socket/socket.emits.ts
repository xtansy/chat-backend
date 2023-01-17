import { io } from "../../server"

export const createDialogEmit = () => {
    io.emit("createDialog", { text: "New dialog was created" })
}
export const deleteDialogEmit = () => {
    io.emit("deleteDialog", { text: "Dialog was deleted" })
}