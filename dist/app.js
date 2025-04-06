"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const route_1 = __importDefault(require("./app/route/route"));
const globalErrorHandler_1 = __importDefault(require("./app/middleware/globalErrorHandler"));
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
exports.app.use((0, cors_1.default)({ origin: "https://lcd-frontend.vercel.app", credentials: true }));
exports.app.use("/api/v1", route_1.default);
exports.app.use(globalErrorHandler_1.default);
exports.app.get("/", (req, res) => {
    res.send("Hello World!");
});
