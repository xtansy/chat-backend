"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getImagePublicId = void 0;
const getImagePublicId = (url) => {
    const arr = url.split("/");
    return arr[arr.length - 1].split(".")[0];
};
exports.getImagePublicId = getImagePublicId;
