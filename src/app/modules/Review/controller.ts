import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { reviewServices } from "./services";
import sendResponse from "../../utils/sendRespone";

const createReview = catchAsync(async (req: Request, res: Response) => {
  const review = req.body;
  const result = await reviewServices.createReview(review);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    data: result,
    message: "Review created successfully",
  });
});

const getAllReviews = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;
  const result = await reviewServices.getAllReviews(query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    data: result,
    message: "All reviews retrieved successfully",
  });
});

const getReviewsByProduct = catchAsync(async (req: Request, res: Response) => {
  const { productId } = req.params;
  const result = await reviewServices.getReviewsByProduct(productId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    data: result,
    message: "Product reviews retrieved successfully",
  });
});

const softDeleteReview = catchAsync(async (req: Request, res: Response) => {
  const { reviewId } = req.params;
  const deleted = req.body;
  const result = await reviewServices.softDeleteReview(reviewId, deleted);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    data: result,
    message: "Review deleted successfully",
  });
});

export const reviewController = {
  createReview,
  getAllReviews,
  getReviewsByProduct,
  softDeleteReview,
};
