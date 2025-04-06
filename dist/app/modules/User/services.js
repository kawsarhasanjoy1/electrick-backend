"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServices = void 0;
const QueryBuilder_1 = require("../../builders/QueryBuilder");
const model_1 = require("./model");
const createUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield model_1.userModel.create(payload);
    return result;
});
const getAllUsers = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const searchUser = new QueryBuilder_1.QueryBuilder(model_1.userModel.find(), query)
        .search(["name", "email"])
        .filter([])
        .sort()
        .paginate();
    const countTotal = yield searchUser.countTotal();
    const result = yield searchUser.modelQuery;
    return {
        meta: countTotal,
        result,
    };
});
const softDeleteUser = (userId, soft) => __awaiter(void 0, void 0, void 0, function* () {
    const isDeleted = soft === null || soft === void 0 ? void 0 : soft.isDeleted;
    const deletedAt = isDeleted == true ? new Date() : null;
    return yield model_1.userModel.findByIdAndUpdate(userId, { isDeleted, deletedAt: deletedAt }, { new: true });
});
const blockUser = (userId, blocked) => __awaiter(void 0, void 0, void 0, function* () {
    const isBlocked = blocked === null || blocked === void 0 ? void 0 : blocked.isBlocked;
    return yield model_1.userModel.findByIdAndUpdate(userId, { isBlocked }, { new: true });
});
const upUserRole = (userId, role) => __awaiter(void 0, void 0, void 0, function* () {
    return yield model_1.userModel.findByIdAndUpdate(userId, { role: role === null || role === void 0 ? void 0 : role.role }, { new: true });
});
exports.UserServices = {
    createUser,
    getAllUsers,
    softDeleteUser,
    blockUser,
    upUserRole,
};
