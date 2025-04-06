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
exports.ProductControllers = exports.softDeletedProduct = exports.updateProduct = exports.fetchSingleProduct = void 0;
const services_1 = require("./services");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendRespone_1 = __importDefault(require("../../utils/sendRespone"));
const createProduct = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = req.body;
    const result = yield services_1.ProductServices.createProduct(product);
    (0, sendRespone_1.default)(res, {
        statusCode: 201,
        success: true,
        data: result,
        message: "product created successful",
    });
}));
const fetchProduct = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    const result = yield services_1.ProductServices.fetchProduct(query);
    (0, sendRespone_1.default)(res, {
        statusCode: 200,
        success: true,
        data: result,
        message: "product fetched successful",
    });
}));
exports.fetchSingleProduct = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = req.params.productId;
    const product = yield services_1.ProductServices.fetchProductById(productId);
    return (0, sendRespone_1.default)(res, {
        statusCode: 200,
        success: true,
        data: product,
        message: "single product fetched successfully",
    });
}));
exports.updateProduct = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = req.params.productId;
    const updateData = req.body;
    const updatedProduct = yield services_1.ProductServices.updateProductById(productId, updateData);
    return (0, sendRespone_1.default)(res, {
        statusCode: 200,
        success: true,
        data: updatedProduct,
        message: "Product updated successfully",
    });
}));
exports.softDeletedProduct = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = req.params.productId;
    const { isDeleted } = req.body;
    const updatedProduct = yield services_1.ProductServices.softDeletedProduct(productId, isDeleted);
    return (0, sendRespone_1.default)(res, {
        statusCode: 200,
        success: true,
        data: updatedProduct,
        message: "Product updated successfully",
    });
}));
const deleteProduct = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = req.params.productId;
    const deletedProduct = yield services_1.ProductServices.deleteProductById(productId);
    return (0, sendRespone_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Product deleted successfully",
        data: deletedProduct,
    });
}));
exports.ProductControllers = {
    createProduct,
    fetchProduct,
    updateProduct: exports.updateProduct,
    fetchSingleProduct: exports.fetchSingleProduct,
    deleteProduct,
    softDeletedProduct: exports.softDeletedProduct,
};
