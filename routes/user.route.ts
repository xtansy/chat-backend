import { verifyToken } from "../middleware/auth.Jwt";
import { userBoard, index, deleteAll, getMe } from "../controllers/user.controller";
import { Express } from "express-serve-static-core";

export const userRoute = (app: Express) => {

    app.get("/users/all", index);
    app.delete("/users/deleteAll", deleteAll);

    app.get("/test/user", verifyToken, userBoard);
    app.get("/users/getMe", verifyToken, getMe);


    app.get("/test/all", userBoard);
};
