import { model, Schema } from "mongoose";
import { TOrder } from "./interface";

const saleSchema = new Schema<TOrder>(
  {
    productId: { type: Schema.Types.ObjectId, ref: "product", required: true },
    userId: { type: Schema.Types.ObjectId, ref: "user", required: true },
    number: { type: String, required: true },
    quantity: { type: Number, required: true },
    buyerName: { type: String, required: true },
  },
  { timestamps: true }
);

export const orderModel = model<TOrder>("order", saleSchema);
