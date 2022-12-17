export interface ServerToClientEvents {
    message: (obj: { dialogId: string; message: string }) => void;
    test: (test: string) => void;
}

export interface ClientToServerEvents {
    message: (obj: { dialogId: string; message: string }) => void;
    join: (dialogIds: string[]) => void;
}