import mongoose, { Model } from "mongoose";

import { User, UserModelDocument } from "./user.model";
import { RoleType } from "../@types";
import { RoleModelDocument, Role } from "./role.model";
import { DialogModelDocument, Dialog} from "./dialog.model";

mongoose.Promise = global.Promise;

interface Database {
    mongoose: any;
    user: Model<UserModelDocument>;
    role: Model<RoleModelDocument>;
    ROLES: RoleType[];
    dialog: Model<DialogModelDocument>;
}
export const db: Database = {
    mongoose,
    user: User,
    role: Role,
    ROLES: ["user", "admin", "moderator"],
    dialog: Dialog
};
