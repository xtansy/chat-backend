import { deleteAll, index } from "../controllers/role.controller";
import { Express } from "express-serve-static-core";

export const roleRoute = (app: Express) => {
    app.delete("/roles/deleteAll", deleteAll);
    app.get("/roles/index", index);
};
