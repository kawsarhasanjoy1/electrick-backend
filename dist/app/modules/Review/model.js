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
exports.reviewModel = void 0;
const mongoose_1 = require("mongoose");
const model_1 = __importDefault(require("../Product/model"));
const reviewSchema = new mongoose_1.Schema({
    productId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "product",
        required: true,
    },
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    rating: { type: Number, required: true, min: 1, max: 5 },
    review: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null },
}, { timestamps: true });
reviewSchema.statics.calcAverageRatings = function (productId) {
    return __awaiter(this, void 0, void 0, function* () {
        const findProductReview = yield this.aggregate([
            {
                $match: { productId },
            },
            {
                $group: {
                    _id: "productId",
                    numberOfRatings: { $sum: 1 },
                    avgRating: { $avg: "$rating" },
                },
            },
        ]);
        if (findProductReview.length > 0) {
            yield model_1.default.findByIdAndUpdate(productId, {
                ratingAverage: findProductReview[0].avgRating,
                ratingQuantity: findProductReview[0].numberOfRatings,
            });
        }
        else {
            model_1.default.findByIdAndUpdate(productId, {
                ratingAverage: 0,
                ratingQuantity: 0,
            });
        }
    });
};
reviewSchema.index({ productId: 1, userId: 1 }, { unique: true });
exports.reviewModel = (0, mongoose_1.model)("review", reviewSchema);
