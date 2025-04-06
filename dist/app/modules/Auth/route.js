"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("./controller");
const authRouter = (0, express_1.Router)();
authRouter.post("/login-user", controller_1.authController.loginUser);
exports.default = authRouter;
