import { MessageModelDocument } from "../models/message.model";
export interface ServerToClientEvents {
    message: (obj: { dialogId: string; message: MessageModelDocument; photos?: string[] }) => void;
    createDialog: (obj: { text: string }) => void;
    deleteDialog: (obj: { text: string }) => void;
}
export interface ChatMessage {
    text: string;
    imagesFiles: Buffer[];
}
export interface ClientToServerEvents {
    join: (obj: { dialogIds: string[], userId: string }) => void;

    message: (obj: { dialogId: string; message: ChatMessage, userId: string }) => void;
}

