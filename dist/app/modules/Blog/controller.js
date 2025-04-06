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
exports.blogController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const services_1 = require("./services");
const sendRespone_1 = __importDefault(require("../../utils/sendRespone"));
// Create a new blog
const createBlog = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const blogData = req.body;
    const result = yield services_1.blogService.createBlog(blogData);
    (0, sendRespone_1.default)(res, {
        statusCode: 201,
        success: true,
        data: result,
        message: "Blog created successfully",
    });
}));
// Get all blogs
const getAllBlogs = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    const result = yield services_1.blogService.getAllBlogs(query);
    (0, sendRespone_1.default)(res, {
        statusCode: 200,
        success: true,
        data: result,
        message: "Blogs fetched successfully",
    });
}));
// Get a single blog by ID
const getBlogById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { blogId } = req.params;
    const result = yield services_1.blogService.getBlogById(blogId);
    (0, sendRespone_1.default)(res, {
        statusCode: 200,
        success: true,
        data: result,
        message: "Blog fetched successfully",
    });
}));
// Update a blog by ID
const updateBlog = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { blogId } = req.params;
    const updateData = req.body;
    const result = yield services_1.blogService.updateBlog(blogId, updateData);
    (0, sendRespone_1.default)(res, {
        statusCode: 200,
        success: true,
        data: result,
        message: "Blog updated successfully",
    });
}));
// Delete a blog by ID
const deleteBlog = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { blogId } = req.params;
    yield services_1.blogService.deleteBlog(blogId);
    (0, sendRespone_1.default)(res, {
        statusCode: 200,
        success: true,
        data: null,
        message: "Blog deleted successfully",
    });
}));
exports.blogController = {
    createBlog,
    getAllBlogs,
    getBlogById,
    deleteBlog,
    updateBlog,
};
