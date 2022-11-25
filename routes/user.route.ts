import { verifyToken } from "../middleware/auth.Jwt";
import { userBoard } from "../controllers/user.controller";
import { Express } from "express-serve-static-core";

export const userRoute = (app: Express) => {
    app.use((req, res, next) => {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/test/all", userBoard);
    app.get("/test/user", verifyToken, userBoard);
};
