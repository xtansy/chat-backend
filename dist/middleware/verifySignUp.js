"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkRoleExist = exports.checkDuplicateUsernameOrEmail = void 0;
const models_1 = require("../models");
const { user: User } = models_1.db;
const checkDuplicateUsernameOrEmail = (req, res, next) => {
    // Login
    User.findOne({
        login: req.body.login,
    }).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (user) {
            res.status(400).send({
                message: "Failed! Login is already in use!",
            });
            return;
        }
        // Email
        User.findOne({
            email: req.body.email,
        }).exec((err, user) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            if (user) {
                res.status(400).send({
                    message: "Failed! Email is already in use!",
                });
                return;
            }
            next();
        });
    });
};
exports.checkDuplicateUsernameOrEmail = checkDuplicateUsernameOrEmail;
const checkRoleExist = (req, res, next) => {
    const roles = req.body.roles;
    let existId = null;
    if (roles) {
        roles.forEach((role, i) => {
            if (!models_1.db.ROLES.includes(role)) {
                existId = i;
            }
        });
    }
    if (existId) {
        res.status(400).send({
            message: `Failed! Role ${roles[existId]} does not exist!`,
        });
        return;
    }
    next();
};
exports.checkRoleExist = checkRoleExist;
