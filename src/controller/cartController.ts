import { Request, Response } from "express";
import { getById } from "../service/productService";
import { createCartEntry } from "../service/cartService";
import { getUserByEmail } from "../service/userService";

export const addToCart = async (req: Request, res: Response) => {
  console.log("In addToCart Route", req.body, req.params, res.locals.userName);
  const { productId, quantity } = req.body;

  try {
    const product = await getById(parseInt(productId));
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const user = await getUserByEmail(res.locals.userName);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log("Product: ", product);
    console.log("User: ", user);

    const newCartEntry = await createCartEntry(user, product, quantity);

    if (!newCartEntry) {
      return res.status(500).json({
        message: "Cart entry could not be created",
      });
    }

    return res.status(201).json({
      message: "Product added successfully to the cart.",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Product cannot be added. Please try again later.",
    });
  }
};
