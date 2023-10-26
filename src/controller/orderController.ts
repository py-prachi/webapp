import { Request, Response } from "express";
import { getUserByEmail } from "../service/userService";
import { createOrder } from "../service/orderService";
import { getCart } from "../service/cartService";


export const checkoutCart = async (req: Request, res: Response) => {
  console.log("In checkout Cart Route", req.body, req.params, res.locals.userName);
  const { shippingAddress, contactNumber, cardNumber } = req.body;

  
    
    const user = await getUserByEmail(res.locals.userName);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    
    console.log("User: ", user, user.id);
    const userId = user.id;
    try {
    const newOrderEntry = await createOrder(userId, shippingAddress, contactNumber, cardNumber);
    console.log("Returned back from create Order!!!");
    console.log("Order Created :", newOrderEntry);

    if (!newOrderEntry) {
        return res.status(500).json({
          message: "Order could not be created",
        });
      }
      const cartRecords = await getCart(userId);
      console.log("Returned from Cart entity:", cartRecords);
      return res.status(201).json({
        message: "Order placed successfully.",
      });

  } catch (error) {
    return res.status(500).json({
      message: "Order cannot be added. Please try again later.",
    });
  }
};
