import { verifyToken } from "../middleware/auth.Jwt";
import { userBoard, index, deleteAll } from "../controllers/user.controller";
import { Express } from "express-serve-static-core";

export const userRoute = (app: Express) => {

    app.get("/users/all", index);
    app.delete("/users/deleteAll", deleteAll);

    app.get("/test/all", userBoard);
    app.get("/test/user", verifyToken, userBoard);
};
