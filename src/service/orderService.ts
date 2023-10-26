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
