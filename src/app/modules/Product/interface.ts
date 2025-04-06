import { Types } from "mongoose";
import {
  DisplayFeatureItem,
  DisplayRefreshRate,
  DisplayResolution,
} from "../../interface/common";

export interface TProduct {
  userId: Types.ObjectId;
  name: string;
  price: number;
  discountPrice: number;
  image: string;
  description: string;
  quantity: number;
  brand: string;
  modelNumber: string;
  category: string;
  features?: DisplayFeatureItem;
  screenSize: number;
  resolution: DisplayResolution;
  refreshRate: DisplayRefreshRate;
  displayType: string;
  hdrSupport?: boolean;
  quality: "original" | "medium" | "high" | "custom";
  isDeleted: boolean;
  sold: number;
  ratingAverage: number;
  ratingQuantity: number;
  status: "available" | "upcoming";
}
