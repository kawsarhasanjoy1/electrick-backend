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
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogService = void 0;
const QueryBuilder_1 = require("../../builders/QueryBuilder");
const model_1 = require("./model");
const createBlog = (blogData) => __awaiter(void 0, void 0, void 0, function* () {
    return yield model_1.blogModel.create(blogData);
});
const getAllBlogs = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const searchFields = ["title", "category", "status"];
    const filterFields = ["status"];
    const searchQuery = new QueryBuilder_1.QueryBuilder(model_1.blogModel.find(), query)
        .search(searchFields)
        .filter(filterFields)
        .sort()
        .paginate();
    const countTotal = yield searchQuery.countTotal();
    const result = yield searchQuery.modelQuery.populate("userId");
    return {
        meta: countTotal,
        result,
    };
});
const getBlogById = (blogId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield model_1.blogModel.findById(blogId);
});
const updateBlog = (blogId, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    return yield model_1.blogModel.findByIdAndUpdate(blogId, updateData, { new: true });
});
const deleteBlog = (blogId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield model_1.blogModel.findByIdAndDelete(blogId);
});
exports.blogService = {
    createBlog,
    getAllBlogs,
    getBlogById,
    deleteBlog,
    updateBlog,
};
