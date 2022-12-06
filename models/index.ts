import mongoose, { Model } from "mongoose";

import { User, UserModelDocument } from "./user.model";
import { RoleModelDocument, Role, RoleType } from "./role.model";
import { Collections } from "../utils/mongodb";

mongoose.Promise = global.Promise;

interface Database {
    mongoose: any;
    user: Model<Extract<Collections, UserModelDocument>>;
    role: Model<RoleModelDocument>;
    ROLES: RoleType[];
}
export const db: Database = {
    mongoose,
    user: User,
    role: Role,
    ROLES: ["user", "admin", "moderator"],
};
