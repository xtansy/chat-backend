"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAll = exports.index = void 0;
const models_1 = require("../models");
const index = async (req, res) => {
    models_1.db.message.find({}).populate("userId").exec((err, messages) => {
        if (err || !messages) {
            res.status(403).json({
                message: "Сообщения не найдены!",
                error: err
            });
            return;
        }
        res.json({
            status: "Сообщения успешно найдены!",
            data: messages,
        });
    });
};
exports.index = index;
const deleteAll = (req, res) => {
    models_1.db.message.deleteMany({}).exec((err) => {
        if (err) {
            res.status(403).json({
                message: "Cannot delete all messages",
                error: err
            });
            return;
        }
        res.status(200).json({
            status: "succes",
            message: "All messages has been deleted"
        });
    });
};
exports.deleteAll = deleteAll;
