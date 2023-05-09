import { Express } from "express-serve-static-core";

import { getMyDialogs, createDialog, index, deleteAll, deleteDialog } from "../controllers/dialog.controller";
import { verifyToken } from "../middleware";

export const dialogRoute = (app: Express) => {

    app.get("/dialog/index", index);
    app.get("/dialog/getMyDialogs", verifyToken, getMyDialogs);

    app.post("/dialog/create", verifyToken, createDialog);

    app.delete("/dialog/delete/:dialogId", verifyToken, deleteDialog);
    app.delete("/dialog/deleteAll", deleteAll);

};
