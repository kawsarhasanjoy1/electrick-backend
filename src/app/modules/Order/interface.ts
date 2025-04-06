import { Types } from "mongoose";

export interface TOrder {
  productId: Types.ObjectId;
  userId: Types.ObjectId;
  quantity: number;
  number: string;
  buyerName: string;
}
