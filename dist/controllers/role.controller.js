"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.index = exports.deleteAll = void 0;
const models_1 = require("../models");
const deleteAll = (req, res) => {
    models_1.db.role.deleteMany({}).exec((err) => {
        if (err) {
            res.status(403).json({
                message: "Cannot delete all roles",
                error: err
            });
            return;
        }
        res.status(200).json({
            status: "succes",
            message: "All Roles has been deleted"
        });
    });
};
exports.deleteAll = deleteAll;
const index = async (req, res) => {
    try {
        const roles = await models_1.db.role.find({}).exec();
        res.json({
            status: "success",
            data: roles,
        });
    }
    catch (error) {
        res.json({
            status: "error",
            data: JSON.stringify(error),
        });
    }
};
exports.index = index;
