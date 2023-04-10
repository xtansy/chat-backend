"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDialog = exports.getMyDialogs = exports.index = exports.deleteDialog = exports.deleteAll = void 0;
const mongodb_1 = require("mongodb");
const models_1 = require("../models");
const socket_emits_1 = require("./socket/socket.emits");
const Dialog = models_1.db.dialog;
const Message = models_1.db.message;
const User = models_1.db.user;
const deleteAll = (req, res) => {
    Dialog.deleteMany({}).exec((err) => {
        if (err) {
            res.status(403).json({
                message: "Cannot delete all dialogs",
                error: err,
            });
            return;
        }
        res.status(200).json({
            status: "succes",
            message: "All dialogs has been deleted",
        });
    });
};
exports.deleteAll = deleteAll;
const deleteDialog = async (req, res) => {
    const userId = req.body.userId;
    const dialogId = req.params.dialogId;
    Dialog.findById(dialogId).exec((err, dialog) => {
        if (err || !dialog) {
            return res.status(404).json({
                message: "Диалог не найден",
            });
        }
        dialog.messages.forEach(async (mes) => {
            await Message.deleteOne({ _id: mes._id });
        });
        Dialog.deleteOne({
            $or: [{ owner: userId }, { partner: userId }],
            $and: [{ _id: dialogId }],
        }, (err) => {
            if (err) {
                return res.status(401).json({
                    message: "Диалог не был удален",
                    error: err,
                });
            }
            (0, socket_emits_1.deleteDialogEmit)({ dialogId: String(dialog._id) });
            return res.status(200).json({
                message: "Диалог был удален!",
            });
        });
    });
};
exports.deleteDialog = deleteDialog;
const index = (req, res) => {
    Dialog.find({})
        .populate(["owner", "partner", "messages"])
        .exec((err, dialogs) => {
        if (err || !dialogs) {
            return res.status(403).json({
                message: "Not found dialogs",
                error: err,
            });
        }
        res.json({
            status: "success",
            data: dialogs,
        });
    });
};
exports.index = index;
const getMyDialogs = (req, res) => {
    const userId = new mongodb_1.ObjectId(req.body.userId);
    Dialog.find()
        .or([{ owner: userId }, { partner: userId }])
        .populate(["owner", "partner", "messages"])
        .exec((err, dialogs) => {
        if (err) {
            return res.status(404).json({
                message: "Dialogs not found",
            });
        }
        return res.json({
            message: "Dialogs founded!",
            data: dialogs,
        });
    });
};
exports.getMyDialogs = getMyDialogs;
const createDialog = async (req, res) => {
    const { userId, partnerLogin } = req.body;
    const owner = await User.findById(userId).populate("role").exec();
    if (!owner) {
        return res.status(404).json({
            message: "Owner not found",
        });
    }
    if (owner.login === partnerLogin) {
        return res.status(401).json({
            message: "Нельзя создать диалог с самим собой",
        });
    }
    const partner = await User.findOne({ login: partnerLogin })
        .populate("role")
        .exec();
    if (!partner) {
        return res.status(404).json({
            message: "Партнер не найден!",
        });
    }
    const createdDialog = await Dialog.findOne({
        $and: [{ owner }, { partner }],
    }).exec();
    if (createdDialog) {
        return res.status(401).json({
            message: "Dialog is already created",
        });
    }
    const dialog = {
        owner,
        partner,
        messages: [],
    };
    const response = new Dialog(dialog);
    await response.save();
    if (!response) {
        return res.status(401).json({
            message: "ошибка",
        });
    }
    (0, socket_emits_1.createDialogEmit)({
        userId: String(userId),
        partnerId: String(partner._id),
    });
    return res.status(200).json({
        message: "Dialog was created!",
        data: response,
    });
    // User.findById(userId)
    //     .populate("role")
    //     .exec((err, owner) => {
    //         if (err || !owner) {
    //             return res.status(404).json({
    //                 message: "Owner not found",
    //             });
    //         }
    //         if (owner.login === partnerLogin) {
    //             return res.status(401).json({
    //                 message: "Нельзя создать диалог с самим собой",
    //             });
    //         }
    //         User.findOne({ login: partnerLogin })
    //             .populate("role")
    //             .exec((err, partner) => {
    //                 if (err || !partner) {
    //                     return res.status(404).json({
    //                         message: "Партнер не найден!",
    //                     });
    //                 }
    //                 Dialog.findOne({
    //                     $and: [{ owner }, { partner }],
    //                 }).exec((err, createdDialog) => {
    //                     if (createdDialog) {
    //                         return res.status(401).json({
    //                             message: "Dialog is already created",
    //                         });
    //                     }
    //                 });
    //                 const dialog: DialogModel = {
    //                     owner,
    //                     partner,
    //                     messages: [],
    //                 };
    //                 const response = new Dialog(dialog);
    //                 response.save((err, resp) => {
    //                     if (err || !resp) {
    //                         return res.status(401).json({
    //                             message: err,
    //                         });
    //                     }
    //                     createDialogEmit({
    //                         userId: String(userId),
    //                         partnerId: String(partner._id),
    //                     });
    //                     return res.status(200).json({
    //                         message: "Dialog was created!",
    //                         data: resp,
    //                     });
    //                 });
    //             });
    //     });
};
exports.createDialog = createDialog;
