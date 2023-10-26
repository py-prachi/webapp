import express from "express";

import { registerUser, userLogin } from "../../controller/userController";
import { searchProduct } from "../../controller/productController";
import { addToCart } from "../../controller/cartController";
import { authUser } from "../../middleware/authorizer";
import { checkoutCart } from "../../controller/orderController";

const userRouter = express.Router();

userRouter.post("/login", userLogin);

userRouter.post("/register", registerUser);

userRouter.get("/product/search", searchProduct);

userRouter.post("/products/addToCart", authUser, addToCart);

userRouter.post("/checkout", authUser, checkoutCart);

export default userRouter;
