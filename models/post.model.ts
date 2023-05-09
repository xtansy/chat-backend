import { Schema, model } from "mongoose";
import { Document } from "mongoose";

import { PostModel } from "../@types/models";

export type PostModelDocument = PostModel & Document;

export const Post = model<PostModelDocument>(
    "Post",
    new Schema<PostModel>({
        text: {
            required: true,
            type: String
        },
        likes: [{
            required: true,
            type: Schema.Types.ObjectId,
            ref: "User"
        }],
        user: {
            required: true,
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        image: {
            type: String,
        }
    }, {
        versionKey: false,
        timestamps: {
            createdAt: true,
            updatedAt: false
        },
    })
);
