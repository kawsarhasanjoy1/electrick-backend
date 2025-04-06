import { model, Schema } from "mongoose";
import { TBlog } from "./interface";

const blogSchema = new Schema<TBlog>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "user", required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String },
    category: { type: String, required: true },
    status: {
      type: String,
      enum: ["published", "unpublished"],
      default: "published",
    },
  },
  { timestamps: true }
);

export const blogModel = model<TBlog>("blog", blogSchema);
