import bcrypt from "bcrypt";
import httpStatus from "http-status";
import AppError from "../../error/AppError";
import { userModel } from "../User/model";
import { TLoginUser } from "./interface";
import { createToken } from "./auth.utils";
import config from "../../config/config";

const loginUser = async (payload: TLoginUser) => {
  const { email, password } = payload;
  const user = await userModel.findOne({ email });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "this user is not found");
  }
  const hashPassword = user?.password;
  if (!password || !hashPassword) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Password or hashed password is missing"
    );
  }
  const match = await bcrypt.compare(password, hashPassword);
  if (!match) {
    throw new AppError(httpStatus.FORBIDDEN, "password dose not match");
  }
  const jwtPayload = {
    userId: user?._id.toString(),
    email: user?.email,
    role: user?.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expireIn as string | number
  );
  const refreshToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_refresh_expireIn as string | number
  );

  return {
    accessToken,
    refreshToken,
  };
};

export const authServices = {
  loginUser,
};
