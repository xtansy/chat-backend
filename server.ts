import express from "express";
import cors from "cors";

import { test123 } from "./test123/test123";

const app = express();

const corsOptions = {
    origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.json({ message: "Welcome to bezkoder application." });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    test123();
    console.log(`Server is running on port ${PORT}.`);
});