"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cloudinaryDeleteImage = exports.cloudinaryUploadImages = exports.cloudinaryUploadImage = void 0;
const streamifier_1 = __importDefault(require("streamifier"));
const cloudinary_1 = require("../../core/cloudinary");
const helpers_1 = require("../helpers");
const cloudinaryUploadImage = async (buffer) => {
    return new Promise((resolve, reject) => {
        let stream = cloudinary_1.cloudinary.v2.uploader.upload_stream((error, result) => {
            if (result) {
                resolve(result);
            }
            else {
                reject(error);
            }
        });
        streamifier_1.default.createReadStream(buffer).pipe(stream);
    });
};
exports.cloudinaryUploadImage = cloudinaryUploadImage;
const cloudinaryUploadImages = async (buffers) => {
    const promises = buffers.map(async (buffer) => {
        return (0, exports.cloudinaryUploadImage)(buffer);
    });
    return Promise.all(promises);
};
exports.cloudinaryUploadImages = cloudinaryUploadImages;
const cloudinaryDeleteImage = async (url) => {
    const publicId = (0, helpers_1.getImagePublicId)(url);
    return await cloudinary_1.cloudinary.v2.uploader.destroy(publicId);
};
exports.cloudinaryDeleteImage = cloudinaryDeleteImage;
