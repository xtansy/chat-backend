import { Express } from "express-serve-static-core";

import { checkDuplicateUsernameOrEmail, validate } from "../middleware";
import { signin, signup } from "../controllers/auth.controller";
import { signUpValidation, signInValidation } from "../utils";

export const authRoute = (app: Express) => {
    app.post("/auth/signup", [checkDuplicateUsernameOrEmail, validate(signUpValidation)], signup);
    app.post("/auth/signin", validate(signInValidation), signin);
};
