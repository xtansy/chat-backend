"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoute = void 0;
const middleware_1 = require("../middleware");
const auth_controller_1 = require("../controllers/auth.controller");
const utils_1 = require("../utils");
const authRoute = (app) => {
    app.post("/auth/signup", [middleware_1.checkDuplicateUsernameOrEmail, (0, middleware_1.validate)(utils_1.signUpValidation)], auth_controller_1.signup);
    app.post("/auth/signin", (0, middleware_1.validate)(utils_1.signInValidation), auth_controller_1.signin);
};
exports.authRoute = authRoute;
