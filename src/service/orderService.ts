import { AppDataSource } from "../data-source";
import { Orders, order_status } from "../entity/Orders";

export const createOrder = async (
  userId: number,
  shippingAddress: string,
  contactNumber: string,
  cardNumber: string
) => {
  console.log("In Create Order Service!");
  const orderRepository = AppDataSource.getRepository(Orders);

  const totalAmount = 0;
  const newOrderEntry = new Orders();
  newOrderEntry.user_id = userId;
  newOrderEntry.shipping_address = shippingAddress;
  newOrderEntry.contact_number = contactNumber;
  newOrderEntry.card_number = cardNumber;
  const currentDate = new Date();
  newOrderEntry.orderDate = currentDate;
  newOrderEntry.total_amount = totalAmount;
  newOrderEntry.order_status = order_status.PENDING ;
  

  try {
    const orderEntry = await orderRepository.save(newOrderEntry);
    return orderEntry;
  } catch (error) {
    console.error("Error creating Order:", error);
    return null;
  }
};

export const updateOrder = async (
    orderId: number,
    totalPrice: number,
    
    ) => {
    try {
      console.log("data received in update Order service: ", orderId);
      const orderRepository = AppDataSource.getRepository(Orders);
      const order_to_update = await orderRepository.findOne({
        where: { order_id: orderId },
      });
  
      if (!order_to_update) return null;
  
      order_to_update.total_amount = totalPrice;
      order_to_update.order_status = order_status.COMPLETED;
     
  
      await orderRepository.save(order_to_update);
      return order_to_update;
    } catch (error) {
      console.error(`Error updating Order:`, error);
      return null;
    }
  };
