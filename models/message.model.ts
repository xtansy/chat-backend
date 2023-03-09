import { Schema, model } from "mongoose";
import { Document } from "mongoose";
import { MessageModel } from "../@types/models";

export type MessageModelDocument = MessageModel & Document;

export const Message = model<MessageModelDocument>(
    "Message",
    new Schema<MessageModel>({
        text: {
            required: true,
            type: String
        },
        userId: {
            required: true,
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        photos: [{ type: String }]
    }, {
        versionKey: false,
        timestamps: {
            createdAt: true,
            updatedAt: false
        },
    })
);
