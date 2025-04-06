import { Router } from "express";
import { authController } from "./controller";

const authRouter = Router();

authRouter.post("/login-user", authController.loginUser);

export default authRouter;
