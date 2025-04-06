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
exports.reviewServices = exports.deleteOldSoftDeletedReviews = exports.getReviewsByProduct = exports.getAllReviews = exports.createReview = void 0;
const QueryBuilder_1 = require("../../builders/QueryBuilder");
const model_1 = require("./model");
const createReview = (reviewData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield model_1.reviewModel.create(reviewData);
    if (result) {
        yield model_1.reviewModel.calcAverageRatings(result.productId);
    }
    return result;
});
exports.createReview = createReview;
const getAllReviews = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const searchFields = ["userId.name", "userId.email", "rating"];
    const filterFields = ["createdAt", "rating"];
    const searchReview = new QueryBuilder_1.QueryBuilder(model_1.reviewModel.find(), query)
        .search(searchFields)
        .filter(filterFields)
        .sort()
        .paginate();
    const countTotal = yield searchReview.countTotal();
    const result = yield searchReview.modelQuery.populate("productId userId");
    return {
        result,
        meta: countTotal,
    };
});
exports.getAllReviews = getAllReviews;
const getReviewsByProduct = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield model_1.reviewModel.find({ productId }).populate("userId");
});
exports.getReviewsByProduct = getReviewsByProduct;
const softDeleteReview = (reviewId, isDeleted) => __awaiter(void 0, void 0, void 0, function* () {
    return yield model_1.reviewModel.findByIdAndUpdate(reviewId, {
        isDeleted: isDeleted === null || isDeleted === void 0 ? void 0 : isDeleted.isDeleted,
        deletedAt: new Date(),
    });
});
const deleteOldSoftDeletedReviews = () => __awaiter(void 0, void 0, void 0, function* () {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return yield model_1.reviewModel.deleteMany({
        isDeleted: true,
        deletedAt: { $lte: thirtyDaysAgo },
    });
});
exports.deleteOldSoftDeletedReviews = deleteOldSoftDeletedReviews;
exports.reviewServices = {
    createReview: exports.createReview,
    getAllReviews: exports.getAllReviews,
    getReviewsByProduct: exports.getReviewsByProduct,
    softDeleteReview,
};
