import express from "express";
import cors from "cors";

import { mongoDbConnect } from "./core/mongodb";
import { authRoute } from "./routes/auth.route";
import { userRoute } from "./routes/user.route";

const app = express();

const corsOptions = {
    origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

mongoDbConnect();

authRoute(app);
userRoute(app);

app.get("/test", (req, res) => {
    res.status(400).send({
        message: "test",
    });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
