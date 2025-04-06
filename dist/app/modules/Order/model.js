"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderModel = void 0;
const mongoose_1 = require("mongoose");
const saleSchema = new mongoose_1.Schema({
    productId: { type: mongoose_1.Schema.Types.ObjectId, ref: "product", required: true },
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: "user", required: true },
    number: { type: String, required: true },
    quantity: { type: Number, required: true },
    buyerName: { type: String, required: true },
}, { timestamps: true });
exports.orderModel = (0, mongoose_1.model)("order", saleSchema);
