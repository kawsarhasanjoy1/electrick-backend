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
exports.ProductServices = void 0;
const QueryBuilder_1 = require("../../builders/QueryBuilder");
const model_1 = __importDefault(require("./model"));
const createProduct = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield model_1.default.create(payload);
    return result;
});
const fetchProduct = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const searchFields = [
        "name",
        "brand",
        "modelNumber",
        "category",
        "features.name",
        "displayType",
        "quality",
    ];
    const filterFields = [
        "category",
        "userId",
        "brand",
        "displayType",
        "hdrSupport",
        "quality",
        "resolution",
        "status",
        "discountPrice",
        "refreshRate",
    ];
    const p = query === null || query === void 0 ? void 0 : query.discountPrice;
    if (p == 0) {
        query.discountPrice = { $gt: Number(p) };
    }
    const searchQuery = new QueryBuilder_1.QueryBuilder(model_1.default.find({ isDeleted: false }), query)
        .search(searchFields)
        .filter(filterFields)
        .sort()
        .paginate();
    const meta = yield searchQuery.countTotal();
    const result = yield searchQuery.modelQuery.populate({
        path: "userId",
        select: "-__v -password",
    });
    return { result, meta };
});
const fetchProductById = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield model_1.default.findById(productId).populate({
        path: "reviews",
        populate: [
            { path: "userId", select: "-password -__v" },
            { path: "productId", select: "name brand category" },
        ],
    });
});
const updateProductById = (productId, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    return yield model_1.default.findByIdAndUpdate(productId, updateData, {
        new: true,
    });
});
const softDeletedProduct = (productId, isDeleted) => __awaiter(void 0, void 0, void 0, function* () {
    return yield model_1.default.findByIdAndUpdate(productId, {
        isDeleted: isDeleted,
        new: true,
    });
});
const deleteProductById = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield model_1.default.findByIdAndDelete(productId);
});
exports.ProductServices = {
    createProduct,
    fetchProduct,
    fetchProductById,
    updateProductById,
    deleteProductById,
    softDeletedProduct,
};
