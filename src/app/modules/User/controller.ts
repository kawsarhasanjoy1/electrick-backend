import { Request, Response } from "express";
import { UserServices } from "./services";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendRespone";

const createUser = catchAsync(async (req: Request, res: Response) => {
  const user = req.body;
  const result = await UserServices.createUser(user);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "User created successful",
    data: result,
  });
});
const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;
  const result = await UserServices.getAllUsers(query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User fetched successful",
    data: result,
  });
});

const softDeleteUser = catchAsync(async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const soft = req.body;
  const result = await UserServices.softDeleteUser(userId, soft);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User soft deleted successfully",
    data: result,
  });
});

const blockUser = catchAsync(async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const isBlocked = req.body;
  const result = await UserServices.blockUser(userId, isBlocked);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User blocked successfully",
    data: result,
  });
});
const upUserRole = catchAsync(async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const role = req.body;
  const result = await UserServices.upUserRole(userId, role);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User role update successfully",
    data: result,
  });
});

export const UserControllers = {
  createUser,
  getAllUsers,
  softDeleteUser,
  blockUser,
  upUserRole,
};
