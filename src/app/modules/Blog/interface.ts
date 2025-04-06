import { Types } from "mongoose";

export interface TBlog {
  userId: Types.ObjectId;
  title: string;
  description: string;
  category: string;
  image: string;
  status: "published" | "unpublished";
}
