// product.controller.ts
import { Request, Response } from "express";
import {
  createProduct,
  del,
  getById,
  getAllProducts,
  update,
  search,
} from "../service/productService";

export const addProduct = async (req: Request, res: Response) => {
  console.log("In Add Product Route", req.body);

  const { productName, price, quantity, category, description } = req.body;

  if (!productName || !price || !quantity) {
    return res.status(400).json({
      message: "Product name,price or qty field missing",
    });
  }

  try {
    const product = await createProduct(
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
    const product = await getAllProducts();
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
   
    if (delProd) {
      
      return res.status(204).json({ message: "Product deleted" });
    } else if (delProd == null) {
      return res.status(404).json({ message: "Product not found" });
    }
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
  
  if (isNaN(productId)) {
    return res.status(400).json({ message: "Invalid product ID" });
  }

  try {
    const product = await update(productId, productName, price, quantity);
    
    if (!product) {
     
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

    const product = await search(productName, category, description);

    if (product === null || (Array.isArray(product) && product.length === 0)) {
      return res.status(404).json({ message: "Product not found" });
    }
    
    return res.status(200).json({ products: product });
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
