import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { blogService } from "./services";
import sendResponse from "../../utils/sendRespone";

// Create a new blog
const createBlog = catchAsync(async (req: Request, res: Response) => {
  const blogData = req.body;
  const result = await blogService.createBlog(blogData);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    data: result,
    message: "Blog created successfully",
  });
});

// Get all blogs
const getAllBlogs = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;
  const result = await blogService.getAllBlogs(query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    data: result,
    message: "Blogs fetched successfully",
  });
});

// Get a single blog by ID
const getBlogById = catchAsync(async (req: Request, res: Response) => {
  const { blogId } = req.params;
  const result = await blogService.getBlogById(blogId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    data: result,
    message: "Blog fetched successfully",
  });
});

// Update a blog by ID
const updateBlog = catchAsync(async (req: Request, res: Response) => {
  const { blogId } = req.params;
  const updateData = req.body;
  const result = await blogService.updateBlog(blogId, updateData);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    data: result,
    message: "Blog updated successfully",
  });
});

// Delete a blog by ID
const deleteBlog = catchAsync(async (req: Request, res: Response) => {
  const { blogId } = req.params;
  await blogService.deleteBlog(blogId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    data: null,
    message: "Blog deleted successfully",
  });
});

export const blogController = {
  createBlog,
  getAllBlogs,
  getBlogById,
  deleteBlog,
  updateBlog,
};
