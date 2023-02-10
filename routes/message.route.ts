import { Express } from "express-serve-static-core";
import { index, deleteAll } from "../controllers/message.controller";
import { verifyToken } from "../middleware/auth.Jwt";

export const messageRoute = (app: Express) => {
    app.get("/message/all", verifyToken, index);
    app.delete("/message/deleteAll", verifyToken, deleteAll);
};
