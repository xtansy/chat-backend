import { Request, Response } from "express";
import { db } from "../models";
import { RoleType } from "../models/role.model";

const { user, role } = db;

export const checkDuplicateUsernameOrEmail = (
    req: Request,
    res: Response,
    next: () => void
) => {
    const { username, email } = req.body;

    user.findOne({ username }).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (user) {
            res.status(400).send({
                message: "Failed! Username is already in use!",
            });
            return;
        }
    });
    user.findOne({ email }).exec((err, user) => {
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
    });

    next();
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
