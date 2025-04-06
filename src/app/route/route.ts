import { Router } from "express";
import userRouter from "../modules/User/route";
import productRouter from "../modules/Product/route";
import authRouter from "../modules/Auth/route";
import orderRouter from "../modules/Order/route";
import reviewRouter from "../modules/Review/route";
import blogRouter from "../modules/Blog/route";

const Route = Router();
const routePath = [
  {
    path: "/users",
    route: userRouter,
  },
  {
    path: "/products",
    route: productRouter,
  },
  {
    path: "/auth",
    route: authRouter,
  },
  {
    path: "/orders",
    route: orderRouter,
  },
  {
    path: "/blogs",
    route: blogRouter,
  },
  {
    path: "/reviews",
    route: reviewRouter,
  },
];

routePath.forEach((route) => Route.use(route.path, route.route));

export default Route;
