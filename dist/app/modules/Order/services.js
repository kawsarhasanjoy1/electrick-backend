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
exports.orderServices = exports.deleteOrder = exports.getOrderById = exports.getAllOrders = exports.createOrder = void 0;
const AppError_1 = __importDefault(require("../../error/AppError"));
const model_1 = __importDefault(require("../Product/model"));
const model_2 = require("./model");
const http_status_1 = __importDefault(require("http-status"));
const date_fns_1 = require("date-fns");
const createOrder = (orderData) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = orderData === null || orderData === void 0 ? void 0 : orderData.productId;
    const quantity = orderData === null || orderData === void 0 ? void 0 : orderData.quantity;
    const product = yield model_1.default.findById(productId);
    if (!product) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "product not found");
    }
    const upQuantity = Number(product === null || product === void 0 ? void 0 : product.quantity) - Number(quantity);
    const upSold = Number(product === null || product === void 0 ? void 0 : product.sold) + Number(quantity);
    if (upQuantity < 0) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Not enough stock available");
    }
    const upProduct = yield model_1.default.findByIdAndUpdate(productId, {
        quantity: upQuantity,
        sold: upSold,
    });
    return yield model_2.orderModel.create(orderData);
});
exports.createOrder = createOrder;
const getAllOrders = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield model_2.orderModel.find().populate("productId userId");
});
exports.getAllOrders = getAllOrders;
const getOrderById = (orderId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield model_2.orderModel.findById(orderId).populate("productId userId");
});
exports.getOrderById = getOrderById;
const deleteOrder = (orderId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield model_2.orderModel.findByIdAndDelete(orderId);
});
exports.deleteOrder = deleteOrder;
const getSalesHistory = (period) => __awaiter(void 0, void 0, void 0, function* () {
    let startDate, endDate;
    switch (period) {
        case "daily":
            startDate = (0, date_fns_1.startOfDay)(new Date());
            endDate = (0, date_fns_1.endOfDay)(new Date());
            break;
        case "weekly":
            startDate = (0, date_fns_1.startOfWeek)(new Date());
            endDate = (0, date_fns_1.endOfWeek)(new Date());
            break;
        case "monthly":
            startDate = (0, date_fns_1.startOfMonth)(new Date());
            endDate = (0, date_fns_1.endOfMonth)(new Date());
            break;
        case "yearly":
            startDate = (0, date_fns_1.startOfYear)(new Date());
            endDate = (0, date_fns_1.endOfYear)(new Date());
            break;
        default:
            startDate = (0, date_fns_1.startOfDay)(new Date());
            endDate = (0, date_fns_1.endOfDay)(new Date());
    }
    const result = yield model_2.orderModel
        .find({
        createdAt: { $gte: startDate, $lt: endDate },
    })
        .sort({ createdAt: -1 });
    return result;
});
exports.orderServices = {
    createOrder: exports.createOrder,
    getAllOrders: exports.getAllOrders,
    getOrderById: exports.getOrderById,
    deleteOrder: exports.deleteOrder,
    getSalesHistory,
};
