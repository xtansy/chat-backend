import { Request, Response } from "express";
import { RoleType } from "../@types/models";
import { db } from "../models";

const { user: User } = db;

export const checkDuplicateUsernameOrEmail = (
    req: Request,
    res: Response,
    next: () => void
) => {
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

export const checkRoleExist = (
    req: Request,
    res: Response,
    next: () => void
) => {
    const roles: RoleType[] = req.body.roles;
    let existId: number | null = null;
    if (roles) {
        roles.forEach((role, i) => {
            if (!db.ROLES.includes(role)) {
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
