import { checkDuplicateUsernameOrEmail } from "../middleware/verifySignUp";
import { signin, signup } from "../controllers/auth.controller";
import { Express } from "express-serve-static-core";

export const authRoute = (app: Express) => {
    app.use((req, res, next) => {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/auth/signup", checkDuplicateUsernameOrEmail, signup);
    app.post("/auth/signin", signin);
};
