import { Request, Response } from "express";
import { getUserByEmail } from "../service/userService";
import { createOrder, createProductOrder, getOrders, updateOrder } from "../service/orderService";
import { delCart, getCart } from "../service/cartService";

export const checkoutCart = async (req: Request, res: Response) => {
  console.log(
    "In checkout Cart Route",
    req.body,
    req.params,
    res.locals.userName
  );
  const { shippingAddress, contactNumber, cardNumber } = req.body;

  const user = await getUserByEmail(res.locals.userName);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  
  const userId = user.id;
  try {
    const newOrderEntry = await createOrder(
      userId,
      shippingAddress,
      contactNumber,
      cardNumber
    );
    const orderId = newOrderEntry?.order_id;

    if (!newOrderEntry) {
      return res.status(500).json({
        message: "Order could not be created",
      });
    }
    const cartRecords = await getCart(userId);
    
    let totalPrice = 0;
     //
     let entires_in_productOrders = 0;
     //
    if (cartRecords) {
      for (const record of cartRecords) {
        

        const total = String(record.total);
        totalPrice += parseFloat(total);
        await createProductOrder(newOrderEntry!,record);
        entires_in_productOrders +=1;
      }
      const order = await updateOrder(orderId!, totalPrice);
        
        if (!order) {
          console.log("status of order: ", order);
        }
      
        await delCart(userId);
    }

    return res.status(201).json({
      message: "Order placed successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Order cannot be added. Please try again later.",
    });
  }
};


export const orderHistory = async (req: Request, res: Response) => {
  console.log("In orderHistory Route",res.locals.userName);
 
  const user = await getUserByEmail(res.locals.userName);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  
  const userId = user.id;
  try {
    const orderHistory = await getOrders(userId);
    return res.status(200).json({ Orders: orderHistory });
  } catch (error) {
    return res.status(500).json({
      message: "Order cannot be fetched. Please try again later.",
    });
  }
};
