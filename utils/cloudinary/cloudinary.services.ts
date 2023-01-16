import fs from "fs";

import { cloudinary } from "../../core/cloudinary";
import streamifier from "streamifier";

export const cloudinaryUploadImage = (buffer: Buffer): Promise<{ url: string }> => {
    return new Promise((resolve, reject) => {
        let stream = cloudinary.v2.uploader.upload_stream(
            (error, result) => {
                if (result) {
                    resolve({
                        url: result.url,
                    });
                } else {
                    reject(error);
                }
            }
        );
        streamifier.createReadStream(buffer).pipe(stream);
    });
}