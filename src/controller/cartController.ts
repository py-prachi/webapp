import { Request, Response } from "express";
import { getById } from "../service/productService";
import {  createCartEntry, getProductDiscount } from "../service/cartService";
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

    console.log("Product: ", product);
    console.log("User: ", user);

    const discountRate = await checkProductDiscount(product);
    
    console.log("discount Rate:", discountRate);

    const newCartEntry = await createCartEntry(user, product, quantity, discountRate!);

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


export const checkProductDiscount = async (product:Products) => {
    try {
        console.log("In checkProductDiscount function:", product, product.product_id);
        const productId = product.product_id;
        
        console.log("productId:", productId);
        const discounts = await getProductDiscount(productId);
        console.log("Discounts returned from ProductDiscount", discounts);

        const currentDate = new Date();
        const currentDateString = currentDate.toISOString().slice(0, 10);
        if (discounts) {
            for (const discount of discounts) {
                console.log("Dates:", discount.apply_date, discount.end_date, currentDateString);
                const applyDate = new Date(discount.apply_date).toISOString().slice(0, 10);
                const endDate = new Date(discount.end_date).toISOString().slice(0, 10);

                if (currentDateString >= applyDate && currentDateString <= endDate) {
                    console.log("The date is in the valid range", currentDate);

                    const discountRecord = await getDiscById(productId);
                    console.log("Discount status:", discountRecord);

                    if (discountRecord && discountRecord.status) {
                        console.log("Returning discount rate from discount table:", discountRecord.discount_rate);
                        if (discountRecord.discount_type === 'flat'){
                            console.log("discount type is flat:",discountRecord.discount_rate )
                        return discountRecord.discount_rate;}
                        else{
                            console.log("discount type is percent(MRP)(Rate)(discount):",product.price,discountRecord.discount_rate,
                              product.price * (discountRecord.discount_rate/100));
                            return product.price * (discountRecord.discount_rate/100);
                        }
                            
                    } else {
                        console.log("Discount not found; returning 0");
                        return 0;
                    }
                }
            }
        }

        console.log("No discount applied to Product:", productId);
        return null;
    } catch (error) {
        console.error("Error in checkProductDiscount:", error);
        return null;
    }
};






