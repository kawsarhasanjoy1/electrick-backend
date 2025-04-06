import { Router } from "express";
import { blogController } from "./controller";

const blogRouter = Router();

blogRouter.post("/create-blog", blogController.createBlog);
blogRouter.get("/fetch-blog", blogController.getAllBlogs);
blogRouter.get("/fetch-single-blog/:blogId", blogController.getBlogById);
blogRouter.put("/up-blog/:blogId", blogController.updateBlog);
blogRouter.delete("/delete-blog/:blogId", blogController.deleteBlog);

export default blogRouter;
