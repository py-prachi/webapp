// product.controller.ts
import { Request, Response } from 'express';
import { AppDataSource } from "../data-source"
import { Products } from '../entity/Products';
import { addProduct, delProductById, getProductById, getProducts, updateProduct } from '../service/productService';
const jwt = require('jsonwebtoken');

// type UpdateData = {
//   updateData: [productName: string, price: number, quantity: number];
// };

export const productAddControl = async (req: Request, res: Response) => {
  console.log('In Add Product Route', req.body)  
  
  const { 
    productName,
    price,
    quantity 
    } = req.body;
  
    if (!productName || !price || !quantity) {
    return res.status(400).json({
    message: 'Product name,price or qty field missing' });
  }
    
  try {
    const product = await addProduct(productName,price,quantity);
    if (product)
    return res.status(201).json({ message: 'Product added successfully.' });
    } catch(error){
        return res.status(500).json({ message: 'Product cannot be added. Please try again later.' });
      }
};
  
export const productGetControl = async (req: Request, res: Response) => {
  console.log('In Get Product Route', req.body)  
  
  try {
    const product = await getProducts();
    console.log("product:", product )
    if (!product || product.length === 0) {
      console.error("No Products in catalog");
      return res.status(200).json({ message: 'No products in catalog.' });
    }
    return res.json({product:product});
    
    } catch(error){
        return res.status(500).json({ message: 'Error getting product. Please try again later.' });
      }
};
  

export const getProductByIdControl = async (req: Request, res: Response) => {
  try {
    const { id } = req.params; 
    const productId = parseInt(id, 10); 
    console.log("finding product for is :", productId);
    if (isNaN(productId)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    const product = await getProductById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.json({ product });
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    return res.status(500).json({ message: "Server error" });
  }
};


export const deleteProductControl = async (req: Request, res: Response) => {
  try {
    
    const { id } = req.params; 
    const productId = parseInt(id, 10); 
    console.log("in the delete route for :", productId);

    if (isNaN(productId)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    const delProd = await delProductById(productId);
    console.log("product deleted!!");
    const product = await getProducts();
    return res.json({product:product});
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    return res.status(500).json({ message: "Server error" });
  }
};


export const updateProductControl = async (req: Request, res: Response) => {
  try {
    const { id } = req.params; 
    const productId = parseInt(id, 10); 
    console.log("finding product for is :", productId);
    if (isNaN(productId)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }
    const { 
      productName,
      price,
      quantity 
      } = req.body;
      
      // const updateproductName:string;
      // const updateprice:number;
      // const updatequantity:number;

      // if (productName !== undefined) {
      //   updateproductName = productName;
      // }
      // if (price !== undefined) {
      //   updateprice = price;
      // }
      // if (quantity !== undefined) {
      //   updatequantity = quantity;
      // }
  
      
    const product = await updateProduct(productId, productName,price,quantity );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.json({ product });
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    return res.status(500).json({ message: "Server error" });
  }
};







