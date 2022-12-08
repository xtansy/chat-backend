export type RoleType = "user" | "admin" | "moderator";

export interface RoleModel {
    name: RoleType;
}
export interface UserModel {
    email: string;
    login: string;
    name: string;
    surname: string;
    password: string;
    role: RoleModel;
}

export interface DialogModel {
    owner: UserModel;
    partner: UserModel;
    messages: string[];
    lastMessage: string;
}
