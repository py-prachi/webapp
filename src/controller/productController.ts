// registration.controller.ts
import { Request, Response } from 'express';
import { AppDataSource } from "../data-source"
import { Products } from '../entity/Products';

export const addProduct = async (req: Request, res: Response) => {
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
    
  
  // Create a new product entity and save it to the database
  const userRepository = AppDataSource.getRepository(Products)
  
  const newProduct = new Products();
  newProduct.product_name = productName;
  newProduct.price = price;
  newProduct.quantity = quantity;
  
  try {
    await userRepository.save(newProduct);
    return res.status(201).json({ message: 'Product added successfully.' });
  } catch (error) {
    return res.status(500).json({ message: 'Product cannot be added. Please try again later.' });
  }
};
