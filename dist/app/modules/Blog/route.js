"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("./controller");
const blogRouter = (0, express_1.Router)();
blogRouter.post("/create-blog", controller_1.blogController.createBlog);
blogRouter.get("/fetch-blog", controller_1.blogController.getAllBlogs);
blogRouter.get("/fetch-single-blog/:blogId", controller_1.blogController.getBlogById);
blogRouter.put("/up-blog/:blogId", controller_1.blogController.updateBlog);
blogRouter.delete("/delete-blog/:blogId", controller_1.blogController.deleteBlog);
exports.default = blogRouter;
