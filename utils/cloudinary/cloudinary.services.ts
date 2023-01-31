import streamifier from "streamifier";
import { UploadApiResponse } from "cloudinary";

import { cloudinary } from "../../core/cloudinary";
import { getImagePublicId } from "../helpers";

export const cloudinaryUploadImage = (buffer: Buffer): Promise<UploadApiResponse> => {
    return new Promise((resolve, reject) => {
        let stream = cloudinary.v2.uploader.upload_stream(
            (error, result) => {
                if (result) {
                    resolve(result);
                } else {
                    reject(error);
                }
            }
        );
        streamifier.createReadStream(buffer).pipe(stream);
    });
}

export const cloudinaryDeleteImage = async (url: string) => {
    const publicId = getImagePublicId(url);
    return await cloudinary.v2.uploader.destroy(publicId);
}