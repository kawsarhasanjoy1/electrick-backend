"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const commoEnum_1 = require("../../enum/commoEnum");
const productSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: "user", required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    discountPrice: { type: Number, default: 0 },
    image: { type: String, required: true },
    description: { type: String, required: true },
    quantity: { type: Number, required: true },
    brand: { type: String, required: true },
    modelNumber: { type: String, required: true },
    category: { type: String, required: true },
    features: [
        {
            name: {
                type: String,
                enum: Object.values(commoEnum_1.DisplayFeatures),
                required: true,
            },
        },
    ],
    screenSize: { type: Number, required: true },
    resolution: {
        type: String,
        enum: commoEnum_1.DisplayResolutionEnum,
        required: true,
    },
    refreshRate: {
        type: Number,
        enum: commoEnum_1.DisplayRefreshRateEnum,
        required: true,
    },
    displayType: { type: String, required: true },
    hdrSupport: { type: Boolean },
    quality: {
        type: String,
        enum: ["original", "medium", "normal", "high"],
        required: true,
    },
    isDeleted: { type: Boolean, default: false },
    sold: { type: Number, default: 0 },
    ratingAverage: {
        type: Number,
        default: 4.5,
    },
    ratingQuantity: {
        type: Number,
        default: 0,
    },
    status: {
        type: String,
        enum: ["available", "upcoming"],
        default: "available",
    },
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
});
productSchema.virtual("reviews", {
    ref: "review",
    foreignField: "productId",
    localField: "_id",
});
const ProductModel = (0, mongoose_1.model)("product", productSchema);
exports.default = ProductModel;
