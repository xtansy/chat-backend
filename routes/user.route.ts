import { verifyToken } from "../middleware/auth.Jwt";
import { userBoard, index, deleteAll, getMe, getUser, uploadAvatar, deleteAvatar } from "../controllers/user.controller";
import { Express } from "express-serve-static-core";
import { upload } from "../core/multer";

export const userRoute = (app: Express) => {

    app.get("/users/all", index);
    app.delete("/users/deleteAll", deleteAll);

    app.get("/test/user", verifyToken, userBoard);
    app.get("/users/getMe", verifyToken, getMe);

    app.post("/users/upload", [verifyToken, upload.single('avatar')], uploadAvatar);

    app.delete("/users/deleteAvatar", verifyToken, deleteAvatar);

    app.get("/users/getUser/:login", verifyToken, getUser);


    app.get("/test/all", userBoard);
};
