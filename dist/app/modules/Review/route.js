"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller_1 = require("./controller");
const auth_1 = __importDefault(require("../../middleware/auth"));
const constance_1 = require("../../constance/constance");
const reviewRouter = express_1.default.Router();
reviewRouter.post("/create-review", controller_1.reviewController.createReview);
reviewRouter.get("/fetch-reviews", controller_1.reviewController.getAllReviews);
reviewRouter.get("/fetch-review/:productId", (0, auth_1.default)(constance_1.USER_ROLE.admin, constance_1.USER_ROLE.superAdmin), controller_1.reviewController.getReviewsByProduct);
reviewRouter.patch("/soft-delete/:reviewId", (0, auth_1.default)(constance_1.USER_ROLE.admin, constance_1.USER_ROLE.superAdmin), controller_1.reviewController.softDeleteReview);
exports.default = reviewRouter;
