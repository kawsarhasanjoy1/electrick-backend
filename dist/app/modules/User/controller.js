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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserControllers = void 0;
const services_1 = require("./services");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendRespone_1 = __importDefault(require("../../utils/sendRespone"));
const createUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.body;
    const result = yield services_1.UserServices.createUser(user);
    (0, sendRespone_1.default)(res, {
        statusCode: 201,
        success: true,
        message: "User created successful",
        data: result,
    });
}));
const getAllUsers = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    const result = yield services_1.UserServices.getAllUsers(query);
    (0, sendRespone_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "User fetched successful",
        data: result,
    });
}));
const softDeleteUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    const soft = req.body;
    const result = yield services_1.UserServices.softDeleteUser(userId, soft);
    (0, sendRespone_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "User soft deleted successfully",
        data: result,
    });
}));
const blockUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    const isBlocked = req.body;
    const result = yield services_1.UserServices.blockUser(userId, isBlocked);
    (0, sendRespone_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "User blocked successfully",
        data: result,
    });
}));
const upUserRole = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    const role = req.body;
    const result = yield services_1.UserServices.upUserRole(userId, role);
    (0, sendRespone_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "User role update successfully",
        data: result,
    });
}));
exports.UserControllers = {
    createUser,
    getAllUsers,
    softDeleteUser,
    blockUser,
    upUserRole,
};
