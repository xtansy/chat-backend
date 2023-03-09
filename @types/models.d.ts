export type RoleType = "user" | "admin" | "moderator";

export interface RoleModel {
    name: RoleType;
}

export interface UserInfo {
    login: string;
    surname: string;
    name: string;
    email: string;
    _id: string;
    role: RoleModel;
    avatar: string;
}
export interface UserModel extends UserInfo {
    password: string;
}

export interface MessageModel {
    _id: string;
    text: string;
    userId: UserModel;
    photos: string[];
}

export interface DialogModel {
    owner: UserModel;
    partner: UserModel;
    messages: MessageModel[];
    // lastMessage: MessageModel;
}


