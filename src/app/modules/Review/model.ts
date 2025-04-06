import { Schema, model } from "mongoose";
import { TProductModel, TReview } from "./interface";
import ProductModel from "../Product/model";

const reviewSchema = new Schema<TReview>(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "product",
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    rating: { type: Number, required: true, min: 1, max: 5 },
    review: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

reviewSchema.statics.calcAverageRatings = async function (
  productId: Schema.Types.ObjectId
) {
  const findProductReview = await this.aggregate([
    {
      $match: { productId },
    },
    {
      $group: {
        _id: "productId",
        numberOfRatings: { $sum: 1 },
        avgRating: { $avg: "$rating" },
      },
    },
  ]);

  if (findProductReview.length > 0) {
    await ProductModel.findByIdAndUpdate(productId, {
      ratingAverage: findProductReview[0].avgRating,
      ratingQuantity: findProductReview[0].numberOfRatings,
    });
  } else {
    ProductModel.findByIdAndUpdate(productId, {
      ratingAverage: 0,
      ratingQuantity: 0,
    });
  }
};

reviewSchema.index({ productId: 1, userId: 1 }, { unique: true });

export const reviewModel = model<TReview, TProductModel>(
  "review",
  reviewSchema
);
