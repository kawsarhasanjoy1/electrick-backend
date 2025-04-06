import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendRespone";
import { authServices } from "./services";

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const user = req.body;
  const result = await authServices.loginUser(user);
  const { refreshToken, accessToken } = result;
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 1000 * 60 * 60 * 24 * 7,
    path: "/",
  });
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "User login successful",
    data: { accessToken },
  });
});
export const authController = {
  loginUser,
};
