import mongoose, { model, Schema } from "mongoose";
import bcrypt from "bcrypt";
import { TUser } from "./interface";
import config from "../../config/config";

const UserSchema = new Schema<TUser>({
  name: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  image: { type: String, required: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
    required: true,
  },
  isDeleted: { type: Boolean, default: false },
  deletedAt: { type: String, default: null },
  isBlocked: { type: Boolean, default: false },
});

UserSchema.pre("save", async function (next) {
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});

export const userModel = model<TUser>("user", UserSchema);
