import { Request, Response } from "express";
import { orderServices } from "./services";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendRespone";

export const createOrder = catchAsync(async (req: Request, res: Response) => {
  const order = await orderServices.createOrder(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Order successful",
    data: order,
  });
});

export const getAllOrders = catchAsync(async (req: Request, res: Response) => {
  const orders = await orderServices.getAllOrders();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Order fetch successful",
    data: orders,
  });
});


export const getOrderById = catchAsync(async (req: Request, res: Response) => {
  const order = await orderServices.getOrderById(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "single order fetch successful",
    data: order,
  });
});
const getSalesHistory = catchAsync(async (req: Request, res: Response) => {
  const { period } = req.query;
  const order = await orderServices.getSalesHistory(period)
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "sales history fetch successful",
    data: order,
  });
});

export const deleteOrder = catchAsync(async (req: Request, res: Response) => {
  const order = await orderServices.deleteOrder(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "order deleted successful",
    data: order,
  });
});

export const orderController = {
  createOrder,
  getAllOrders,
  getOrderById,
  deleteOrder,
  getSalesHistory,

};
