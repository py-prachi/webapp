import express from "express";

import { registerUser, userLogin } from "../../controller/userController";
import { searchProduct } from "../../controller/productController";
import { addToCart } from "../../controller/cartController";
//import { authUser } from "../../middleware/authorizer";
import { checkoutCart, orderHistory } from "../../controller/orderController";
import { checkPermissions } from "../../middleware/authorizer";

const userRouter = express.Router();

userRouter.post("/login", userLogin);

userRouter.post("/register", registerUser);

userRouter.get("/product/search", searchProduct);

userRouter.post("/products/addToCart", checkPermissions('addToCart'), addToCart);

userRouter.post("/checkout", checkPermissions('checkoutCart'), checkoutCart);

userRouter.get("/orderHistory", checkPermissions('orderHistory'), orderHistory);

export default userRouter;
