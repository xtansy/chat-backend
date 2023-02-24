import { verifyToken } from "../middleware/auth.Jwt";
import { userBoard, index, deleteAll, getMe, uploadAvatar, deleteAvatar, changeUserInfo, changeUserPassword } from "../controllers/user.controller";
import { Express } from "express-serve-static-core";
import { upload } from "../core/multer";

export const userRoute = (app: Express) => {

    app.get("/users/all", index);
    app.get("/users/getMe", verifyToken, getMe);

    app.post("/users/upload", [upload.single('avatar'), verifyToken], uploadAvatar);
    app.post("/users/changeUserInfo", verifyToken, changeUserInfo);
    app.post("/users/changeUserPassword", verifyToken, changeUserPassword);

    app.delete("/users/deleteAll", deleteAll);
    app.delete("/users/deleteAvatar", verifyToken, deleteAvatar);

    app.get("/test/all", userBoard);
    app.get("/test/user", verifyToken, userBoard);
};
