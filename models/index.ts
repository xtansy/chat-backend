import mongoose, { Model } from "mongoose";

import { User, UserModelDocument } from "./user.model";
import { RoleModelDocument, Role } from "./role.model";
import { DialogModelDocument, Dialog } from "./dialog.model";
import { MessageModelDocument, Message } from "./message.model";
import { PostModelDocument, Post } from "./post.model";
import { RoleType } from "../@types/models";
mongoose.Promise = global.Promise;

interface Database {
    mongoose: any;
    user: Model<UserModelDocument>;
    role: Model<RoleModelDocument>;
    ROLES: RoleType[];
    dialog: Model<DialogModelDocument>;
    message: Model<MessageModelDocument>;
    post: Model<PostModelDocument>;
}
export const db: Database = {
    mongoose,
    user: User,
    role: Role,
    ROLES: ["user", "admin", "moderator"],
    dialog: Dialog,
    message: Message,
    post: Post
};
