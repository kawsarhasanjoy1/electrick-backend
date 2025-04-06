import { QueryBuilder } from "../../builders/QueryBuilder";
import { TUser } from "./interface";
import { userModel } from "./model";

const createUser = async (payload: TUser) => {
  const result = await userModel.create(payload);
  return result;
};
const getAllUsers = async (query: Record<string, any>) => {
  const searchUser = new QueryBuilder(userModel.find(), query)
    .search(["name", "email"])
    .filter([])
    .sort()
    .paginate();
  const countTotal = await searchUser.countTotal();
  const result = await searchUser.modelQuery;
  return {
    meta: countTotal,
    result,
  };
};

const softDeleteUser = async (userId: string, soft: any) => {
  const isDeleted = soft?.isDeleted;
  const deletedAt = isDeleted == true ? new Date() : null;
  return await userModel.findByIdAndUpdate(
    userId,
    { isDeleted, deletedAt: deletedAt },
    { new: true }
  );
};

const blockUser = async (userId: string, blocked: any) => {
  const isBlocked = blocked?.isBlocked;
  return await userModel.findByIdAndUpdate(
    userId,
    { isBlocked },
    { new: true }
  );
};
const upUserRole = async (userId: string, role: any) => {
  return await userModel.findByIdAndUpdate(
    userId,
    { role: role?.role },
    { new: true }
  );
};

export const UserServices = {
  createUser,
  getAllUsers,
  softDeleteUser,
  blockUser,
  upUserRole,
};
