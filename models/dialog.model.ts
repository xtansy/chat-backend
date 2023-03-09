import { Schema, model } from "mongoose";
import { Document } from "mongoose";

import { DialogModel } from "../@types/models";

export type DialogModelDocument = DialogModel & Document;

export const Dialog = model<DialogModelDocument>(
    "Dialog",
    new Schema<DialogModel>({
        owner: {
            required: true,
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        partner: {
            required: true,
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        messages: [{
            required: true,
            type: Schema.Types.ObjectId,
            ref: "Message"
        }],
        // lastMessage: {
        //     required: true,
        //     type: Schema.Types.ObjectId,
        //     ref: "Message"
        // }
    }, {
        versionKey: false
    })
);
