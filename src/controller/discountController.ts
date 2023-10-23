import { Request, Response } from "express";

import {
  apply,
  create,
  getAll,
  getDiscById,
  update,
} from "../service/discountService";
import { DiscountType } from "../entity/discount";
import { getById } from "../service/productService";

const jwt = require("jsonwebtoken");

export const addDiscount = async (req: Request, res: Response) => {
  console.log("In Add Discount Route", req.body);

  const { coupon, discount_type, discount_rate, startDate, endDate } = req.body;

  if (!coupon || !discount_rate) {
    return res.status(400).json({
      message: "Coupon name, discount Rate missing",
    });
  }

  if (!Object.values(DiscountType).includes(discount_type)) {
    return res.status(400).json({
      message: "Incorrect discount Type, should be flat or percent ",
    });
  }
  try {
    const discount = await create(
      coupon,
      discount_type,
      discount_rate,
      startDate,
      endDate
    );

    if (discount)
      return res.status(201).json({ message: "Discount added successfully." });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Discount cannot be added. Please try again later." });
  }
};

export const getDiscount = async (req: Request, res: Response) => {
  console.log("In Get Discount Route", req.body);

  try {
    const discount = await getAll();
    console.log("Discount:", discount);

    if (!discount || discount.length === 0) {
      console.error("No Discounts in catalog");
      return res.status(404).json({ message: "No discounts in catalog." });
    }
    return res.status(200).json({ discount });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error getting discount. Please try again later." });
  }
};

export const updateDiscount = async (req: Request, res: Response) => {
  console.log("In Update Discount Route", req.body);
  const { coupon, discount_rate, status, startDate, endDate } = req.body;

  if (!coupon || !discount_rate) {
    return res.status(400).json({
      message: "Coupon name,discount_rate field missing",
    });
  }
  const { id } = req.params;
  const discountId = parseInt(id, 10);
  console.log("finding discount for id :", discountId);
  if (isNaN(discountId)) {
    return res.status(400).json({ message: "Invalid discount ID" });
  }

  try {
    const discount = await update(
      discountId,
      coupon,
      discount_rate,
      status,
      startDate,
      endDate
    );

    if (!discount) {
      console.log("inside dicount not found: ", discount);
      return res.status(404).json({ message: "Discount not found" });
    }

    console.log("control reached here: ", discount);
    return res.status(200).json({ message: "Discount id Updated" });
  } catch (error) {
    console.error("Error fetching discount by ID:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const addProductDiscount = async (req: Request, res: Response) => {
  console.log("In addProductDiscount Route", req.body);
  const { apply_date, end_date } = req.body;
  try {
    const { productId, discountId } = req.params;

    const product = await getById(parseInt(productId));
    const discount = await getDiscById(parseInt(discountId));
    console.log("Product: ", product);
    console.log("Discount: ", discount);

    if (!product || !discount) {
      console.log("inside if loop - prod not found");
      return res.status(404).json({ message: "Product or discount not found" });
    }

    await apply(product, discount, apply_date, end_date);

    return res.status(200).json({
      msg: "Discount applied to Product",
    });
  } catch (error) {
    console.error("Error fetching discount by ID:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
