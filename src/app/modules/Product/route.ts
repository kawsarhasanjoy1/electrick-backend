import { Router } from "express";
import { ProductControllers } from "./controller";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../../constance/constance";

const productRouter = Router();

productRouter.post(
  "/create-product",
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  ProductControllers.createProduct
);
productRouter.get("/fetch-products", ProductControllers.fetchProduct);

productRouter.get(
  "/fetch-product/:productId",
  ProductControllers.fetchSingleProduct
);
productRouter.put(
  "/put-product/:productId",
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  ProductControllers.updateProduct
);
productRouter.patch(
  "/soft-delete/:productId",
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  ProductControllers.softDeletedProduct
);
productRouter.delete(
  "/delete-product/:productId",
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  ProductControllers.deleteProduct
);

export default productRouter;
