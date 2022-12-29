export interface ServerToClientEvents {
    message: (obj: { dialogId: string; message: string }) => void;
    createDialog: (obj: { text: string }) => void;
}

export interface ClientToServerEvents {
    message: (obj: { dialogId: string; message: string }) => void;
    join: (dialogIds: string[]) => void;
}