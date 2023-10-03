// product.controller.ts
import { Request, Response } from 'express';
import { AppDataSource } from "../data-source"
import { Products } from '../entity/Products';
import {addProduct} from '../service/addProduct';
const jwt = require('jsonwebtoken');

export const productControl = async (req: Request, res: Response) => {
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
  
