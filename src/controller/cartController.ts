import { Request, Response } from 'express';
import { getById } from '../service/productService';
import { createCartEntry } from '../service/cartService';
import { getUserByEmail} from '../service/userService';

const jwt = require('jsonwebtoken');

export const addToCart = async (req: Request, res: Response) => {
    console.log('In addToCart Route', req.body, res.locals.userName) 
    const { 
      productId,
      quantity
      } = req.body;  
    try {
    //const {userName} = res.locals.userName; 

    const product = await getById(parseInt(productId));

    if (!product){
        console.log("inside if loop - prod not found")
        return res.status(404).json({ message: "Product not found" });
    }
    console.log("Email:",res.locals.userName)
    const user = await getUserByEmail(res.locals.userName);
    
    if (!user) {
        console.log("inside if loop - user not found")
        return res.status(404).json({ message: 'User not found' });
    }

    console.log("Product: ", product);
    console.log("User: ", user);

    const newCartEntry = await createCartEntry(user,product,quantity );
    
    if (!newCartEntry) {
        return res.status(500).json({
            message: 'Cart entry could not be created',
          });
        }
    
    return res.status(201).json({
      message: 'Product added successfully to the cart.',
    });


  } catch (error) {
        console.error('Error adding product to cart:', error);
        return res.status(500).json({
          message: 'Product cannot be added. Please try again later.',
        });
  }
};

