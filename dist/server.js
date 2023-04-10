"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const mongodb_1 = require("./core/mongodb");
const routes_1 = require("./routes");
const socket_controller_1 = require("./controllers/socket/socket.controller");
const app = (0, express_1.default)();
const httpServer = (0, http_1.createServer)(app);
exports.io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: "*",
    },
});
app.use((0, cors_1.default)());
// parse requests of content-type - application/json
app.use(express_1.default.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express_1.default.urlencoded({ extended: true }));
(0, mongodb_1.mongoDbConnect)();
(0, routes_1.authRoute)(app);
(0, routes_1.userRoute)(app);
(0, routes_1.dialogRoute)(app);
(0, routes_1.roleRoute)(app);
(0, routes_1.messageRoute)(app);
exports.io.on('connection', socket_controller_1.socketOnConnect);
const PORT = process.env.PORT || 8080;
httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
