"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoute = void 0;
const middleware_1 = require("../middleware");
const user_controller_1 = require("../controllers/user.controller");
const multer_1 = require("../core/multer");
const utils_1 = require("../utils");
const userRoute = (app) => {
    app.get("/users/all", user_controller_1.index);
    app.get("/users/getMe", middleware_1.verifyToken, user_controller_1.getMe);
    app.post("/users/upload", [multer_1.upload.single('avatar'), middleware_1.verifyToken], user_controller_1.uploadAvatar);
    app.post("/users/changeUserInfo", [(0, middleware_1.validate)(utils_1.changeUserInfoValidation), middleware_1.verifyToken], user_controller_1.changeUserInfo);
    app.post("/users/changeUserPassword", [(0, middleware_1.validate)(utils_1.changeUserPasswordValidation), middleware_1.verifyToken], user_controller_1.changeUserPassword);
    app.delete("/users/deleteAll", user_controller_1.deleteAll);
    app.delete("/users/deleteAvatar", middleware_1.verifyToken, user_controller_1.deleteAvatar);
    app.get("/test/all", user_controller_1.userBoard);
    app.get("/test/user", middleware_1.verifyToken, user_controller_1.userBoard);
};
exports.userRoute = userRoute;
