"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleRoute = void 0;
const role_controller_1 = require("../controllers/role.controller");
const roleRoute = (app) => {
    app.delete("/roles/deleteAll", role_controller_1.deleteAll);
    app.get("/roles/index", role_controller_1.index);
};
exports.roleRoute = roleRoute;
