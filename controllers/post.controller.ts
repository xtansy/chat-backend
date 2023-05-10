import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { PostModel } from "../@types/models";
import { cloudinaryUploadImage } from "../utils";

import { db } from "../models";

const Post = db.post;
const User = db.user;


export const index = (req: Request, res: Response) => {
    Post.find({})
        .populate(["user"])
        .exec((err, posts) => {
            if (err || !posts) {
                return res.status(403).json({
                    message: "Not found posts",
                    error: err,
                });
            }
            res.json({
                status: "success",
                data: posts,
            });
        });
};

export const getMyPosts = (req: Request, res: Response) => {
    const userId = new ObjectId(req.body.userId);

    Post.find({ user: userId })
        .populate(["user"])
        .exec((err, posts) => {
            if (err) {
                return res.status(404).json({
                    message: "posts not found",
                });
            }
            return res.json({
                message: "posts founded!",
                data: posts,
            });
        });
};
export const getPostsByUserId = (req: Request, res: Response) => {
    const userId = new ObjectId(req.params.userId);

    Post.find({ user: userId })
        .populate(["user", "likes"])
        .exec((err, posts) => {
            if (err) {
                return res.status(404).json({
                    message: "posts not found",
                });
            }
            return res.json({
                message: "posts founded!",
                data: posts,
            });
        });
};

export const createPost = async (req: Request, res: Response) => {
    const { userId, text } = req.body;

    const imageFile = req.file;

    const user = await User.findById(userId).populate("role").exec();
    if (!user) {
        return res.status(404).json({
            message: "user not found",
        });
    }

    let imageResponse;
    if (imageFile) {
        imageResponse = await cloudinaryUploadImage(imageFile.buffer);
    }

    const post: PostModel = {
        text,
        user,
        likes: [],
    };
    if (imageResponse) {
        post.image = imageResponse.url;
    }

    const response = new Post(post);

    await response.save();

    if (!response) {
        return res.status(401).json({
            message: "ошибка",
        });
    }

    return res.status(200).json({
        message: "Post was created!",
        data: response,
    });
};

export const deleteAll = (req: Request, res: Response) => {
    Post.deleteMany({}).exec((err) => {
        if (err) {
            res.status(403).json({
                message: "Cannot delete all Post",
                error: err,
            });
            return;
        }
        res.status(200).json({
            status: "succes",
            message: "All Posts has been deleted",
        });
    });
};


export const like = (req: Request, res: Response) => {
    const { postId, userId } = req.body;

    Post.findById(postId).exec(async (err, post) => {
        if (err || !post) {
            res.status(403).json({
                message: "Cannot find Post",
                error: err,
            });
            return;
        }
        User.findById(userId).exec(async (err, user) => {
            if (err || !user) {
                res.status(403).json({
                    message: "Cannot find user",
                    error: err,
                });
                return;
            }
            const isExistMyLike = post.likes.find(user => String(user._id) === String(userId));
            if (isExistMyLike) {
                post.likes = post.likes.filter(user => String(user._id) !== String(userId));
            } else {
                post.likes.push(user);
            }
            await post.save();
            res.status(200).json({
                message: "Like was been plused",
            });
        });
    })
}


export const getLentaPosts = async (req: Request, res: Response) => {
    const { userId } = req.body;
    const user = await User.findById(userId);

    if (!user) {
        return res.status(403).json({
            message: "Cannot find user",
        });
    };

    let promises: any = [];

    user.friends.forEach((friend) => {
        const post = Post.find({ user: friend._id }).populate("user");
        promises.push(post);
    })

    Promise.all(promises)
        .then(result => {
            result = [].concat(...result);
            res.status(200).json({
                data: result,
                message: "Lenta was finded",
            });
        })
}







