import { MessageModelDocument } from "../models/message.model";
export interface ServerToClientEvents {
    message: (obj: { dialogId: string; message: MessageModelDocument }) => void;
    createDialog: (obj: { text: string }) => void;
}

export interface ClientToServerEvents {
    join: (dialogIds: string[]) => void;
    message: (obj: { dialogId: string; text: string, userId: string }) => void;
}

