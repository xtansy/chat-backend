import { Schema, model } from "mongoose";
import { Types } from "mongoose";
export interface UserModel {
    email: string;
    username: string;
    password: string;
    role: Types.ObjectId;
}
export type UserModelDocument = UserModel & Document;

export const User = model<UserModelDocument>(
    "User",
    new Schema<UserModel>({
        username: {
            required: true,
            type: String,
        },
        email: {
            required: true,
            type: String,
        },
        password: {
            required: true,
            type: String,
        },
        role: {
            required: true,
            type: Schema.Types.ObjectId,
            ref: "Role",
        },
    })
);
