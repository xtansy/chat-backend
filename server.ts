import express from "express";
import cors from "cors";
<<<<<<< HEAD
=======
import { mongoDbConnect } from "./core/mongodb";
>>>>>>> 5d578a525324f2a9c1502930dece237072c75a0c

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

app.get("/", (req, res) => {
    res.json({ message: "Welcome to bezkoder application." });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
<<<<<<< HEAD
    console.log(`Server is running on port ${PORT}.`);
=======
    console.log(`Server is s on port ${PORT}.`);
>>>>>>> 5d578a525324f2a9c1502930dece237072c75a0c
});
