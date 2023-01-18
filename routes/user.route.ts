import { verifyToken } from "../middleware/auth.Jwt";
import { userBoard, index, deleteAll, getMe, getUser, uploadAvatar, deleteAvatar, changeUserInfo } from "../controllers/user.controller";
import { Express } from "express-serve-static-core";
import { upload } from "../core/multer";

export const userRoute = (app: Express) => {

    app.get("/users/all", index);

    app.delete("/users/deleteAll", deleteAll);

    app.get("/users/getMe", verifyToken, getMe);

    app.post("/users/upload", [verifyToken, upload.single('avatar')], uploadAvatar);

    app.get("/test/user", verifyToken, userBoard);


    app.delete("/users/deleteAvatar", verifyToken, deleteAvatar);


    app.get("/users/getUser/:login", verifyToken, getUser);

    app.post("/users/changeUserInfo", verifyToken, changeUserInfo);


    app.get("/test/all", userBoard);
};
