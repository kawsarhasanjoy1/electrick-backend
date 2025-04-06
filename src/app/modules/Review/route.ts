import express from "express";
import { reviewController } from "./controller";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../../constance/constance";

const reviewRouter = express.Router();

reviewRouter.post("/create-review", reviewController.createReview);
reviewRouter.get("/fetch-reviews", reviewController.getAllReviews);
reviewRouter.get(
  "/fetch-review/:productId",
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  reviewController.getReviewsByProduct
);
reviewRouter.patch(
  "/soft-delete/:reviewId",
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  reviewController.softDeleteReview
);

export default reviewRouter;
