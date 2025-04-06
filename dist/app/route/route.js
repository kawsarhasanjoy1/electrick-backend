"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const route_1 = __importDefault(require("../modules/User/route"));
const route_2 = __importDefault(require("../modules/Product/route"));
const route_3 = __importDefault(require("../modules/Auth/route"));
const route_4 = __importDefault(require("../modules/Order/route"));
const route_5 = __importDefault(require("../modules/Review/route"));
const route_6 = __importDefault(require("../modules/Blog/route"));
const Route = (0, express_1.Router)();
const routePath = [
    {
        path: "/users",
        route: route_1.default,
    },
    {
        path: "/products",
        route: route_2.default,
    },
    {
        path: "/auth",
        route: route_3.default,
    },
    {
        path: "/orders",
        route: route_4.default,
    },
    {
        path: "/blogs",
        route: route_6.default,
    },
    {
        path: "/reviews",
        route: route_5.default,
    },
];
routePath.forEach((route) => Route.use(route.path, route.route));
exports.default = Route;
