import { Schema, model, Document } from "mongoose";

export type RoleType = "user" | "admin" | "moderator";

export interface RoleModel {
    name: RoleType;
}
export type RoleModelDocument = RoleModel & Document;

export const Role = model<RoleModelDocument>(
    "Role",
    new Schema<RoleModel>({
        name: String,
    })
);
