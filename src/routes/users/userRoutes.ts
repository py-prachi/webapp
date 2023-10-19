import express from "express";

import { registerUser, userLogin } from "../../controller/userController";
import { searchProduct } from "../../controller/productController";
import { addToCart } from "../../controller/cartController";
import { authUser } from "../../middleware/authorizer";

const userRouter = express.Router();

userRouter.post("/login", userLogin);

userRouter.post("/register", registerUser);

userRouter.get("/product/search", searchProduct);

userRouter.post("/products/addToCart", authUser, addToCart);

export default userRouter;
