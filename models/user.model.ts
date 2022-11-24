import { Schema, model } from "mongoose";
import { RoleModelDocument } from "./role.model";

export interface UserModel {
    email: string;
    name: string;
    password: string;
    role: RoleModelDocument;
}
export type UserModelDocument = UserModel & Document;

export const User = model<UserModelDocument>(
    "User",
    new Schema<UserModel>({
        name: String,
        email: String,
        password: String,
        role: [
            {
                type: Schema.Types.ObjectId,
                ref: "Role",
            },
        ],
    })
);
