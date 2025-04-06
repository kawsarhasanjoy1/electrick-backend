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
exports.orderController = exports.deleteOrder = exports.getOrderById = exports.getAllOrders = exports.createOrder = void 0;
const services_1 = require("./services");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendRespone_1 = __importDefault(require("../../utils/sendRespone"));
exports.createOrder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield services_1.orderServices.createOrder(req.body);
    (0, sendRespone_1.default)(res, {
        statusCode: 201,
        success: true,
        message: "Order successful",
        data: order,
    });
}));
exports.getAllOrders = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield services_1.orderServices.getAllOrders();
    (0, sendRespone_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Order fetch successful",
        data: orders,
    });
}));
exports.getOrderById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield services_1.orderServices.getOrderById(req.params.id);
    (0, sendRespone_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "single order fetch successful",
        data: order,
    });
}));
const getSalesHistory = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { period } = req.query;
    const order = yield services_1.orderServices.getSalesHistory(period);
    (0, sendRespone_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "sales history fetch successful",
        data: order,
    });
}));
exports.deleteOrder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield services_1.orderServices.deleteOrder(req.params.id);
    (0, sendRespone_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "order deleted successful",
        data: order,
    });
}));
exports.orderController = {
    createOrder: exports.createOrder,
    getAllOrders: exports.getAllOrders,
    getOrderById: exports.getOrderById,
    deleteOrder: exports.deleteOrder,
    getSalesHistory,
};
