import { Request, Response } from "express";
import { getById } from "../service/productService";
import { createCartEntry, getProductDiscount } from "../service/cartService";
import { getUserByEmail } from "../service/userService";
import { getDiscById } from "../service/discountService";
import { Products } from "../entity/Products";

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

    let discountRate = await checkProductDiscount(product);

    if (discountRate === null) {
      discountRate = 0;
    }

    const newCartEntry = await createCartEntry(
      user,
      product,
      quantity,
      discountRate!
    );

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

export const checkProductDiscount = async (product: Products) => {
  try {
    console.log("In checkProductDiscount function:", product);
    const productId = product.product_id;

    const productDiscounts = await getProductDiscount(productId);

    const currentDate = new Date();
    const currentDateString = currentDate.toISOString().slice(0, 10);
    if (productDiscounts) {
      for (const discount of productDiscounts) {
        const applyDate = new Date(discount.apply_date)
          .toISOString()
          .slice(0, 10);
        const endDate = new Date(discount.end_date).toISOString().slice(0, 10);

        if (currentDateString >= applyDate && currentDateString <= endDate) {
          const discountRecord = await getDiscById(
            discount.discount.discount_id
          );

          if (discountRecord && discountRecord.status) {
            if (discountRecord.discount_type === "flat") {
              return discountRecord.discount_rate;
            } else {
              return product.price * (discountRecord.discount_rate / 100);
            }
          } else {
            return 0;
          }
        }
      }
    }

    return null;
  } catch (error) {
    console.error("Error in checkProductDiscount:", error);
    return null;
  }
};
