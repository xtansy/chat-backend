"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongoDbConnect = void 0;
const models_1 = require("../models");
const config_1 = require("../config");
const helpers_1 = require("../utils/helpers");
const { USERNAME, PASSWORD } = config_1.dbConfig;
const mongoDbConnect = () => {
    models_1.db.mongoose
        .connect(`mongodb+srv://${USERNAME}:${PASSWORD}@chat.nkpliol.mongodb.net/?retryWrites=true&w=majority`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
        .then(() => {
        console.log("Successfully connect to MongoDB.");
        (0, helpers_1.initialRolesWithMongo)();
    })
        .catch((err) => {
        console.error("Connection error", err);
        process.exit();
    });
};
exports.mongoDbConnect = mongoDbConnect;
