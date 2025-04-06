import { Model, Types } from "mongoose";

export interface TReview {
  productId: Types.ObjectId;
  userId: Types.ObjectId;
  rating: number;
  review: string;
  isDeleted: boolean;
  deletedAt: any;
}
export interface TProductModel extends Model<TReview> {
  calcAverageRatings(productId: Types.ObjectId): Promise<void>;
}