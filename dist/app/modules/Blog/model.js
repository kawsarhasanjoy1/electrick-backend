"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogModel = void 0;
const mongoose_1 = require("mongoose");
const blogSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: "user", required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String },
    category: { type: String, required: true },
    status: {
        type: String,
        enum: ["published", "unpublished"],
        default: "published",
    },
}, { timestamps: true });
exports.blogModel = (0, mongoose_1.model)("blog", blogSchema);
