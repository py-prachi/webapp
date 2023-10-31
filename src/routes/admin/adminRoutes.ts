import express from "express";

import {
  addDiscount,
  getDiscount,
  addProductDiscount,
  updateDiscount,
} from "../../controller/discountController";
import {
  addProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "../../controller/productController";

import { checkPermissions } from "../../middleware/authorizer";

const adminRouter = express.Router();

adminRouter.post("/product", checkPermissions("addProduct"), addProduct);

adminRouter.get("/product", checkPermissions("getProducts"), getProducts);

adminRouter.get(
  "/product/:id",
  checkPermissions("getProductById"),
  getProductById
);

adminRouter.put(
  "/product/:id",
  checkPermissions("updateProduct"),
  updateProduct
);

adminRouter.delete(
  "/product/:id",
  checkPermissions("deleteProduct"),
  deleteProduct
);

adminRouter.post("/discount", checkPermissions("addDiscount"), addDiscount);

adminRouter.get("/discount", checkPermissions("getDiscount"), getDiscount);

adminRouter.put(
  "/discount/:id",
  checkPermissions("updateDiscount"),
  updateDiscount
);

adminRouter.post(
  "/product/:productId/discount/:discountId",
  checkPermissions("addProductDiscount"),
  addProductDiscount
);

export default adminRouter;
