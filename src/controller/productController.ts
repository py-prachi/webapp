// product.controller.ts
import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Products } from "../entity/Products";
import {
  create,
  del,
  getById,
  getAll,
  update,
  search,
} from "../service/productService";
import { Console } from "console";
const jwt = require("jsonwebtoken");

export const addProduct = async (req: Request, res: Response) => {
  console.log("In Add Product Route", req.body);

  const { productName, price, quantity, category, description } = req.body;

  if (!productName || !price || !quantity) {
    return res.status(400).json({
      message: "Product name,price or qty field missing",
    });
  }

  try {
    const product = await create(
      productName,
      price,
      quantity,
      category,
      description
    );
    if (product)
      return res.status(201).json({ message: "Product added successfully." });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Product cannot be added. Please try again later." });
  }
};

export const getProducts = async (req: Request, res: Response) => {
  console.log("In Get Product Route", req.body);

  try {
    const product = await getAll();
    console.log("product:", product);

    if (!product || product.length === 0) {
      console.error("No Products in catalog");
      return res.status(404).json({ message: "No products in catalog." });
    }
    return res.status(200).json({ product: product });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error getting product. Please try again later." });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const productId = parseInt(id, 10);
    console.log("finding product for id :", productId);
    if (isNaN(productId)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    const product = await getById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.status(200).json({ product });
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const productId = parseInt(id, 10);
  console.log("in the delete route for :", productId);

  if (isNaN(productId)) {
    return res.status(400).json({ message: "Invalid product ID" });
  }

  try {
    const delProd = await del(productId);
    console.log("status of delProd: ", delProd);
    if (delProd) {
      console.log("product deleted!!");
      return res.status(204).json({ message: "Product deleted" });
    } else if (delProd == null) {
      return res.status(404).json({ message: "Product not found" });
    }
    // if(!delProd){
    //   return res.status(404).json({ message: "Product not found" });
    // }
    // return res.status(204).json({ message: "Product deleted" });
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  console.log("In Update Product Route", req.body);
  const { productName, price, quantity } = req.body;

  if (!productName || !price || !quantity) {
    return res.status(400).json({
      message: "Product name,price or qty field missing",
    });
  }
  const { id } = req.params;
  const productId = parseInt(id, 10);
  console.log("finding product for id :", productId);
  if (isNaN(productId)) {
    return res.status(400).json({ message: "Invalid product ID" });
  }

  try {
    const product = await update(productId, productName, price, quantity);
    console.log("status of product: ", product);
    if (!product) {
      console.log("status of product: ", product);
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(204).send();
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const searchProduct = async (req: Request, res: Response) => {
  try {
    console.log("In the search product route!");

    const productName = req.query.productName as string | undefined;
    const category = req.query.category as string | undefined;
    const description = req.query.description as string | undefined;

    console.log("finding product :", productName, category, description);

    const product = await search(productName, category, description);

    if (product === null || (Array.isArray(product) && product.length === 0)) {
      return res.status(404).json({ message: "Product not found" });
    }
    console.log("returned product:", product);
    return res.status(200).json({ products: product });
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
