"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cloudinary = void 0;
const cloudinary_1 = __importDefault(require("cloudinary"));
exports.cloudinary = cloudinary_1.default;
// @ts-ignore
cloudinary_1.default.config({
    cloud_name: 'dwe4hewmt',
    api_key: '562563312616515',
    api_secret: 'ZumjpRb1xwa_afA0KFV5exGLIe8'
});
