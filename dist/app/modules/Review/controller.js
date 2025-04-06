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
exports.reviewController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const services_1 = require("./services");
const sendRespone_1 = __importDefault(require("../../utils/sendRespone"));
const createReview = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const review = req.body;
    const result = yield services_1.reviewServices.createReview(review);
    (0, sendRespone_1.default)(res, {
        statusCode: 201,
        success: true,
        data: result,
        message: "Review created successfully",
    });
}));
const getAllReviews = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    const result = yield services_1.reviewServices.getAllReviews(query);
    (0, sendRespone_1.default)(res, {
        statusCode: 200,
        success: true,
        data: result,
        message: "All reviews retrieved successfully",
    });
}));
const getReviewsByProduct = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId } = req.params;
    const result = yield services_1.reviewServices.getReviewsByProduct(productId);
    (0, sendRespone_1.default)(res, {
        statusCode: 200,
        success: true,
        data: result,
        message: "Product reviews retrieved successfully",
    });
}));
const softDeleteReview = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { reviewId } = req.params;
    const deleted = req.body;
    const result = yield services_1.reviewServices.softDeleteReview(reviewId, deleted);
    (0, sendRespone_1.default)(res, {
        statusCode: 200,
        success: true,
        data: result,
        message: "Review deleted successfully",
    });
}));
exports.reviewController = {
    createReview,
    getAllReviews,
    getReviewsByProduct,
    softDeleteReview,
};
