import { QueryBuilder } from "../../builders/QueryBuilder";
import { TBlog } from "./interface";
import { blogModel } from "./model";

const createBlog = async (blogData: TBlog) => {
  return await blogModel.create(blogData);
};

const getAllBlogs = async (query: Record<string, any>) => {
  const searchFields = ["title", "category", "status"];
  const filterFields = ["status"];
  const searchQuery = new QueryBuilder(blogModel.find(), query)
    .search(searchFields)
    .filter(filterFields)
    .sort()
    .paginate();
  const countTotal = await searchQuery.countTotal();
  const result = await searchQuery.modelQuery.populate("userId");
  return {
    meta: countTotal,
    result,
  };
};

const getBlogById = async (blogId: string) => {
  return await blogModel.findById(blogId);
};

const updateBlog = async (blogId: string, updateData: Partial<TBlog>) => {
  return await blogModel.findByIdAndUpdate(blogId, updateData, { new: true });
};

const deleteBlog = async (blogId: string) => {
  return await blogModel.findByIdAndDelete(blogId);
};

export const blogService = {
  createBlog,
  getAllBlogs,
  getBlogById,
  deleteBlog,
  updateBlog,
};
