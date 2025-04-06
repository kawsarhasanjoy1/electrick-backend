"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("./controller");
const auth_1 = __importDefault(require("../../middleware/auth"));
const constance_1 = require("../../constance/constance");
const productRouter = (0, express_1.Router)();
productRouter.post("/create-product", (0, auth_1.default)(constance_1.USER_ROLE.admin, constance_1.USER_ROLE.superAdmin), controller_1.ProductControllers.createProduct);
productRouter.get("/fetch-products", controller_1.ProductControllers.fetchProduct);
productRouter.get("/fetch-product/:productId", controller_1.ProductControllers.fetchSingleProduct);
productRouter.put("/put-product/:productId", (0, auth_1.default)(constance_1.USER_ROLE.admin, constance_1.USER_ROLE.superAdmin), controller_1.ProductControllers.updateProduct);
productRouter.patch("/soft-delete/:productId", (0, auth_1.default)(constance_1.USER_ROLE.admin, constance_1.USER_ROLE.superAdmin), controller_1.ProductControllers.softDeletedProduct);
productRouter.delete("/delete-product/:productId", (0, auth_1.default)(constance_1.USER_ROLE.admin, constance_1.USER_ROLE.superAdmin), controller_1.ProductControllers.deleteProduct);
exports.default = productRouter;
