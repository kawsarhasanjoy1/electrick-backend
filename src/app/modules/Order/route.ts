import { Router } from "express";
import { orderController } from "./controller";

const orderRouter = Router();

orderRouter.post("/create-order", orderController.createOrder);
orderRouter.get("/fetch-orders", orderController.getAllOrders);
orderRouter.get("/fetch-order/:orderId", orderController.getOrderById);
orderRouter.get("/fetch-sales-range", orderController.getSalesHistory);
orderRouter.delete("/delete-order/:orderId", orderController.deleteOrder);

export default orderRouter;
