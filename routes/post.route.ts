import { Express } from "express-serve-static-core";
import { verifyToken } from "../middleware/auth.Jwt";
import { createPost, index, getMyPosts, getPostsByUserId, deleteAll, like, getLentaPosts } from "../controllers/post.controller";
import { upload } from "../core/multer";

export const postRoute = (app: Express) => {
    app.get("/post/getLenta", verifyToken, getLentaPosts);
    app.get("/post/index", verifyToken, index);
    app.get("/post/getMyPosts", verifyToken, getMyPosts);
    app.get("/post/:userId", verifyToken, getPostsByUserId);


    app.post("/post/create", [upload.single('imageFile'), verifyToken], createPost);

    app.delete("/post/deleteAll", deleteAll);

    app.patch("/post/like", verifyToken, like)
};
