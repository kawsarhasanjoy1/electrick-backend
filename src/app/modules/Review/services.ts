import { QueryBuilder } from "../../builders/QueryBuilder";
import { TReview } from "./interface";
import { reviewModel } from "./model";

export const createReview = async (reviewData: TReview) => {
  const result = await reviewModel.create(reviewData);
  if (result) {
    await reviewModel.calcAverageRatings(result.productId);
  }
  return result;
};

export const getAllReviews = async (query: any) => {
  const searchFields = ["userId.name", "userId.email", "rating"];
  const filterFields = ["createdAt", "rating"];
  const searchReview = new QueryBuilder(reviewModel.find(), query)
    .search(searchFields)
    .filter(filterFields)
    .sort()
    .paginate();
  const countTotal = await searchReview.countTotal();
  const result = await searchReview.modelQuery.populate("productId userId");

  return {
    result,
    meta: countTotal,
  };
};

export const getReviewsByProduct = async (productId: string) => {
  return await reviewModel.find({ productId }).populate("userId");
};

const softDeleteReview = async (
  reviewId: string,
  isDeleted: { isDeleted: boolean }
) => {
  return await reviewModel.findByIdAndUpdate(reviewId, {
    isDeleted: isDeleted?.isDeleted,
    deletedAt: new Date(),
  });
};

export const deleteOldSoftDeletedReviews = async () => {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  return await reviewModel.deleteMany({
    isDeleted: true,
    deletedAt: { $lte: thirtyDaysAgo },
  });
};

export const reviewServices = {
  createReview,
  getAllReviews,
  getReviewsByProduct,
  softDeleteReview,
};
