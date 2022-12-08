import { Express } from "express-serve-static-core";
import { getMyDialogs, createDialog, index, deleteAll } from "../controllers/dialog.controller";
import { verifyToken } from "../middleware/auth.Jwt";

export const dialogRoute = (app: Express) => {
    app.delete("/dialog/deleteAll", deleteAll);
    app.get("/dialog/index", index);
    app.get("/dialog/getMyDialogs", verifyToken, getMyDialogs);
    app.post("/dialog/create", verifyToken, createDialog);
};
