
import { Request, Response } from 'express';

import { create,getAll, getDiscById } from '../service/discountService';
import { getById } from '../service/productService';
import { Discount } from '../entity/discount';

const jwt = require('jsonwebtoken');


export const addDiscount = async (req: Request, res: Response) => {
  console.log('In Add Discount Route', req.body)  
  
  const { 
    coupon,
    //discount_type:DiscountType,
    discount_rate,
    startDate,
    endDate 
    } = req.body;
  
    if (!coupon || !discount_rate ) {
    return res.status(400).json({
    message: 'Coupon name, discount Rate missing' });
  }
    
  try {
    const discount = await create(coupon,discount_rate,startDate,endDate);
    if (discount)
    return res.status(201).json({ message: 'Discount added successfully.' });
    } catch(error){
        return res.status(500).json({ message: 'Discount cannot be added. Please try again later.' });
      }
};
  
export const getDiscount = async (req: Request, res: Response) => {
  console.log('In Get Discount Route', req.body)  
  
  try {
    const discount = await getAll();
    console.log("Discount:", discount )

    if (!discount || discount.length === 0) {
      console.error("No Discounts in catalog");
      return res.status(404).json({ message: 'No discounts in catalog.' });
    }
    return res.status(200).json({discount});
    
    } catch(error){
        return res.status(500).json({ message: 'Error getting discount. Please try again later.' });
      }
};

export const productDiscount = async (req: Request, res: Response) => {
    console.log('In Apply Discount Route');  
    try {
    const { productId, discountId } = req.params; 

    const product = await getById(parseInt(productId));
    const discount = await getDiscById(parseInt(discountId));
    console.log("Product: ", product);
    console.log("Discount: ", discount);
    
    if (!product || !discount){
        return res.status(404).json({ message: "Product or discount not found" });
    }

    product.discounts = [
        
        discount
    ]
    await product.save();
    return res.status(200).json({
        msg: "Discount applied to Product"
    })


  } catch (error) {
    console.error("Error fetching discount by ID:", error);
    return res.status(500).json({ message: "Server error" });
  }
};


// export const getProductById = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params; 
//     const productId = parseInt(id, 10); 
//     console.log("finding product for id :", productId);
//     if (isNaN(productId)) {
//       return res.status(400).json({ message: "Invalid product ID" });
//     }

//     const product = await getById(productId);

//     if (!product) {
//       return res.status(404).json({ message: "Product not found" });
//     }
//     return res.status(200).json({ product });
//   } catch (error) {
//     console.error("Error fetching product by ID:", error);
//     return res.status(500).json({ message: "Server error" });
//   }
// };


// export const deleteProduct = async (req: Request, res: Response) => {
  
  
//     const { id } = req.params; 
//     const productId = parseInt(id, 10); 
//     console.log("in the delete route for :", productId);

//     if (isNaN(productId)) {
//       return res.status(400).json({ message: "Invalid product ID" });
//     }

//   try {
//     const delProd = await del(productId);
//     console.log ( "status of delProd: ", delProd);
//     if (delProd){
//       console.log("product deleted!!");
//       return res.status(204).json({ message: "Product deleted" });;
//     }else if (delProd == null){
//       return res.status(404).json({ message: "Product not found" });
//     }
//     // if(!delProd){
//     //   return res.status(404).json({ message: "Product not found" });
//     // }
//     // return res.status(204).json({ message: "Product deleted" });


//   } catch (error) {
//     console.error("Error fetching product by ID:", error);
//     return res.status(500).json({ message: "Server error" });
//   }
// };


// export const updateProduct = async (req: Request, res: Response) => {
//   console.log('In Update Product Route', req.body) 
//   const { 
//     productName,
//     price,
//     quantity 
//     } = req.body;
       
//   if (!productName || !price || !quantity) {
//     return res.status(400).json({
//     message: 'Product name,price or qty field missing' });
//   }
//   const { id } = req.params; 
//   const productId = parseInt(id, 10); 
//   console.log("finding product for id :", productId);
//   if (isNaN(productId)) {
//     return res.status(400).json({ message: "Invalid product ID" });
//   }

//   try {
//     const product = await update(productId, productName,price,quantity );
//     console.log ( "status of product: ", product);
//     if (!product) {
//       console.log ( "status of product: ", product);
//       return res.status(404).json({ message: "Product not found" });
//     }

//     return res.status(204).send();
//   } catch (error) {
//     console.error("Error fetching product by ID:", error);
//     return res.status(500).json({ message: "Server error" });
//   }
// };







