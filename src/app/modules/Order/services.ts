import AppError from "../../error/AppError";
import ProductModel from "../Product/model";
import { TOrder } from "./interface";
import { orderModel } from "./model";
import httpStatus from "http-status";
import {
  startOfDay,
  endOfDay,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
} from "date-fns";
export const createOrder = async (orderData: TOrder) => {
  const productId = orderData?.productId;
  const quantity = orderData?.quantity;
  const product = await ProductModel.findById(productId);
  if (!product) {
    throw new AppError(httpStatus.NOT_FOUND, "product not found");
  }

  const upQuantity = Number(product?.quantity) - Number(quantity);
  const upSold = Number(product?.sold) + Number(quantity);
  if (upQuantity < 0) {
    throw new AppError(httpStatus.NOT_FOUND, "Not enough stock available");
  }
  const upProduct = await ProductModel.findByIdAndUpdate(productId, {
    quantity: upQuantity,
    sold: upSold,
  });

  return await orderModel.create(orderData);
};

export const getAllOrders = async () => {
  return await orderModel.find().populate("productId userId");
};


export const getOrderById = async (orderId: string) => {
  return await orderModel.findById(orderId).populate("productId userId");
};

export const deleteOrder = async (orderId: string) => {
  return await orderModel.findByIdAndDelete(orderId);
};

const getSalesHistory = async (period: any): Promise<any> => {
  let startDate: Date, endDate: Date;

  switch (period) {
    case "daily":
      startDate = startOfDay(new Date());
      endDate = endOfDay(new Date());
      break;

    case "weekly":
      startDate = startOfWeek(new Date());
      endDate = endOfWeek(new Date());
      break;

    case "monthly":
      startDate = startOfMonth(new Date());
      endDate = endOfMonth(new Date());
      break;

    case "yearly":
      startDate = startOfYear(new Date());
      endDate = endOfYear(new Date());
      break;

    default:
      startDate = startOfDay(new Date());
      endDate = endOfDay(new Date());
  }

  const result = await orderModel
    .find({
      createdAt: { $gte: startDate, $lt: endDate },
    })
    .sort({ createdAt: -1 });

  return result;
};

export const orderServices = {
  createOrder,
  getAllOrders,
  getOrderById,
  deleteOrder,
  getSalesHistory,

};
