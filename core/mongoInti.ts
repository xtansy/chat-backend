import { db } from "../models";
import { dbConfig } from "../config";
import { Error } from "mongoose";
import { initialRolesWithMongo } from "../utils";

const { USERNAME, PASSWORD } = dbConfig;

const mongoDbConnect = () => {
    db.mongoose
        .connect(
            `mongodb+srv://${USERNAME}:${PASSWORD}@chat.nkpliol.mongodb.net/?retryWrites=true&w=majority`,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        )
        .then(() => {
            console.log("Successfully connect to MongoDB.");
            initialRolesWithMongo();
        })
        .catch((err: Error) => {
            console.error("Connection error", err);
            process.exit();
        });
};
const hello = () => {
    console.log(hello);
};

export { hello };
