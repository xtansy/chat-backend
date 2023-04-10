"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initialRolesWithMongo = void 0;
const models_1 = require("../../models");
const { role: Role } = models_1.db;
const initialRolesWithMongo = () => {
    Role.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            new Role({
                name: "user",
            }).save((err) => {
                if (err) {
                    console.log("error", err);
                }
                console.log("added 'user' to roles collection");
            });
            new Role({
                name: "moderator",
            }).save((err) => {
                if (err) {
                    console.log("error", err);
                }
                console.log("added 'moderator' to roles collection");
            });
            new Role({
                name: "admin",
            }).save((err) => {
                if (err) {
                    console.log("error", err);
                }
                console.log("added 'admin' to roles collection");
            });
        }
    });
};
exports.initialRolesWithMongo = initialRolesWithMongo;
