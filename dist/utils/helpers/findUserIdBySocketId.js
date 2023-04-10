"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserIdsArrBySocketId = void 0;
const getUserIdsArrBySocketId = (map, socketId) => {
    return [...map.entries()]
        .filter(({ 1: v }) => v === socketId)
        .map(([k]) => k);
};
exports.getUserIdsArrBySocketId = getUserIdsArrBySocketId;
