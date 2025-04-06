import { Router } from "express";
import { UserControllers } from "./controller";

const userRouter = Router();

userRouter.post("/create-user", UserControllers.createUser);
userRouter.get("/fetch-users", UserControllers.getAllUsers);
userRouter.patch("/up-user-role/:userId", UserControllers.upUserRole);
userRouter.patch("/soft-delete/:userId", UserControllers.softDeleteUser);
userRouter.patch("/block/:userId", UserControllers.blockUser);
export default userRouter;
