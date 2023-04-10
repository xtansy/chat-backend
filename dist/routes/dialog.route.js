"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dialogRoute = void 0;
const dialog_controller_1 = require("../controllers/dialog.controller");
const middleware_1 = require("../middleware");
const dialogRoute = (app) => {
    app.get("/dialog/index", dialog_controller_1.index);
    app.get("/dialog/getMyDialogs", middleware_1.verifyToken, dialog_controller_1.getMyDialogs);
    app.post("/dialog/create", middleware_1.verifyToken, dialog_controller_1.createDialog);
    app.delete("/dialog/delete/:dialogId", middleware_1.verifyToken, dialog_controller_1.deleteDialog);
    app.delete("/dialog/deleteAll", dialog_controller_1.deleteAll);
};
exports.dialogRoute = dialogRoute;
