"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageRoute = void 0;
const message_controller_1 = require("../controllers/message.controller");
const auth_Jwt_1 = require("../middleware/auth.Jwt");
const messageRoute = (app) => {
    app.get("/message/all", auth_Jwt_1.verifyToken, message_controller_1.index);
    app.delete("/message/deleteAll", auth_Jwt_1.verifyToken, message_controller_1.deleteAll);
};
exports.messageRoute = messageRoute;
