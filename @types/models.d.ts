export type RoleType = "user" | "admin" | "moderator";

export interface RoleModel {
    name: RoleType;
}

export interface UserInfo {
    _id: string;
    email: string;
    login: string;
    name: string;
    surname: string;
    role: RoleModel;
}
export interface UserModel extends UserInfo {
    password: string;
}

export interface DialogModel {
    owner: UserModel;
    partner: UserModel;
    messages: string[];
    lastMessage: string;
}
