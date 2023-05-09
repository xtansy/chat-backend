import { Express } from "express-serve-static-core";

import { verifyToken, validate } from "../middleware";
import { userBoard, index, deleteAll, getMe, uploadAvatar, deleteAvatar, changeUserInfo, changeUserPassword, getUserById } from "../controllers/user.controller";
import { upload } from "../core/multer";
import { changeUserPasswordValidation, changeUserInfoValidation } from "../utils";

export const userRoute = (app: Express) => {

    app.get("/users/all", index);
    app.get("/users/getMe", verifyToken, getMe);
    app.get("/users/:userId", verifyToken, getUserById);

    app.post("/users/upload", [upload.single('avatar'), verifyToken], uploadAvatar);
    app.post("/users/changeUserInfo", [validate(changeUserInfoValidation), verifyToken], changeUserInfo);
    app.post("/users/changeUserPassword", [validate(changeUserPasswordValidation), verifyToken], changeUserPassword);

    app.delete("/users/deleteAll", deleteAll);
    app.delete("/users/deleteAvatar", verifyToken, deleteAvatar);

    app.get("/test/all", userBoard);
    app.get("/test/user", verifyToken, userBoard);
};
