import { model, Schema } from "mongoose";
import { TProduct } from "./interface";
import {
  DisplayFeatures,
  DisplayRefreshRateEnum,
  DisplayResolutionEnum,
} from "../../enum/commoEnum";

const productSchema = new Schema<TProduct>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "user", required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    discountPrice: { type: Number, default: 0 },
    image: { type: String, required: true },
    description: { type: String, required: true },
    quantity: { type: Number, required: true },
    brand: { type: String, required: true },
    modelNumber: { type: String, required: true },
    category: { type: String, required: true },
    features: [
      {
        name: {
          type: String,
          enum: Object.values(DisplayFeatures),
          required: true,
        },
      },
    ],
    screenSize: { type: Number, required: true },
    resolution: {
      type: String,
      enum: DisplayResolutionEnum,
      required: true,
    },
    refreshRate: {
      type: Number,
      enum: DisplayRefreshRateEnum,
      required: true,
    },
    displayType: { type: String, required: true },
    hdrSupport: { type: Boolean },
    quality: {
      type: String,
      enum: ["original", "medium", "normal", "high"],
      required: true,
    },
    isDeleted: { type: Boolean, default: false },
    sold: { type: Number, default: 0 },
    ratingAverage: {
      type: Number,
      default: 4.5,
    },
    ratingQuantity: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["available", "upcoming"],
      default: "available",
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

productSchema.virtual("reviews", {
  ref: "review",
  foreignField: "productId",
  localField: "_id",
});

const ProductModel = model<TProduct>("product", productSchema);

export default ProductModel;
