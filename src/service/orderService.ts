import { AppDataSource } from "../data-source";
import { Cart } from "../entity/Cart";
import { Orders, order_status } from "../entity/Orders";
import { ProductOrders } from "../entity/ProductOrders";

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

  export const createProductOrder = async (
    order: Orders,
    record: Cart,
    
  ) => {
    console.log("in create ProductOrder service!");
    const productOrderRepository = AppDataSource.getRepository(ProductOrders);
  
    const newEntry = new ProductOrders();
    newEntry.order = order;
    newEntry.product_id = record.product.product_id;
    newEntry.product_name = record.product.product_name;
    newEntry.description = record.product.description;
    newEntry.category = record.product.category;
    newEntry.quantity = record.quantity;
    newEntry.discountApplied = record.discountApplied;
    newEntry.subtotal = record.subtotal;
    newEntry.total = record.total;
    newEntry.orderDate = order.orderDate;
    newEntry.status = "Ordered";
  
    try {
      const productOrderEntry = await productOrderRepository.save(newEntry);
      return productOrderEntry;
    } catch (error) {
      console.error("Error adding product to productOrderCart:", error);
      return null;
    }
  };

  export const getOrders = async (userId: number) => {
    try {
      console.log("in get Order service", userId);
      const orderRepository = AppDataSource.getRepository(Orders);
  
      const userOrders = await orderRepository
        .createQueryBuilder("order")
        .where("order.user_id = :userId", { userId: userId })
        .leftJoinAndSelect("order.productOrders", "productOrder")
        .getMany();
      return userOrders;
    } catch (error) {
      console.error(
        `Error fetching orders for user: (${userId}):`,
        error
      );
      return null;
    }
  };
  
