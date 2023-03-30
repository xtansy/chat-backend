"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = void 0;
const mongoose_1 = require("mongoose");
exports.Role = (0, mongoose_1.model)("Role", new mongoose_1.Schema({
    name: String,
}, {
    versionKey: false
}));
