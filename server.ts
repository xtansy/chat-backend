import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";

import { mongoDbConnect } from "./core/mongodb";
import { authRoute, userRoute, messageRoute, dialogRoute, roleRoute, postRoute } from "./routes";
import { socketOnConnect } from "./controllers/socket/socket.controller";
import { ClientToServerEvents, ServerToClientEvents } from "./@types/socket";

const app = express();
const httpServer = createServer(app);
export const io = new Server<ClientToServerEvents, ServerToClientEvents>(httpServer, {
    cors: {
        origin: "*",
    },
});

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // разрешить запросы от любого домена
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

mongoDbConnect();

authRoute(app);
userRoute(app);
dialogRoute(app);
roleRoute(app);
messageRoute(app);
postRoute(app);


io.on('connection', socketOnConnect);


const PORT = process.env.PORT || 8080;

httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
