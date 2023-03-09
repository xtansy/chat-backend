import { Schema, model, Document } from "mongoose";
import { RoleModel } from "../@types/models";

export type RoleModelDocument = RoleModel & Document;

export const Role = model<RoleModelDocument>(
    "Role",
    new Schema<RoleModel>({
        name: String,
    }, {
        versionKey: false
    })
);
