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
const http_status_1 = __importDefault(require("http-status"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const config_1 = __importDefault(require("../config/config"));
const AppError_1 = __importDefault(require("../error/AppError"));
const model_1 = require("../modules/User/model");
const auth = (...requiredRoles) => {
    return (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const token = req.headers.authorization;
        // checking if the token is missing
        if (!token) {
            throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "You are not authorized!");
        }
        // checking if the given token is valid
        let decoded;
        try {
            decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt_access_secret);
        }
        catch (err) {
            throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "Unauthorized user");
        }
        const { role, userId, iat } = decoded;
        // checking if the user is exist
        const user = yield model_1.userModel.findById(userId);
        if (!user) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, "This user is not found !");
        }
        const isDeleted = user === null || user === void 0 ? void 0 : user.isDeleted;
        if (isDeleted) {
            throw new AppError_1.default(http_status_1.default.FORBIDDEN, "This user is deleted !");
        }
        const userStatus = user === null || user === void 0 ? void 0 : user.isBlocked;
        if (userStatus) {
            throw new AppError_1.default(http_status_1.default.FORBIDDEN, "This user is blocked ! !");
        }
        // if (
        //   user.passwordChangedAt &&
        //   User.isJWTIssuedBeforePasswordChanged(
        //     user.passwordChangedAt,
        //     iat as number
        //   )
        // ) {
        //   throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized !");
        // }
        if (requiredRoles && !requiredRoles.includes(role)) {
            throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "You are not authorized  hi!");
        }
        req.user = decoded;
        next();
    }));
};
exports.default = auth;
