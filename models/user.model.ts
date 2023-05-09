import { Schema, model } from "mongoose";
import { Document } from "mongoose";
import { UserModel } from "../@types/models";

export type UserModelDocument = UserModel & Document;

export const User = model<UserModelDocument>(
    "User",
    new Schema<UserModel>({
        name: {
            required: true,
            type: String,
        },
        surname: {
            required: true,
            type: String,
        },
        login: {
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
        avatar: String
    }, {
        versionKey: false
    })
);
