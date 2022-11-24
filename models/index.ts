import mongoose, { Model } from "mongoose";

import { User, UserModelDocument } from "./user.model";
import { RoleModelDocument, Role } from "./role.model";

mongoose.Promise = global.Promise;

interface Database {
    mongoose: any;
    user: Model<UserModelDocument, {}, {}, {}, any>;
    role: Model<RoleModelDocument, {}, {}, {}, any>;
    ROLES: string[];
}
export const db: Database = {
    mongoose,
    user: User,
    role: Role,
    ROLES: ["user", "admin", "moderator"],
};
