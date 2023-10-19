import { AppDataSource } from "../data-source";
import { Cart } from "../entity/Cart";
import { Products } from "../entity/Products";
import { User } from "../entity/User";

export const createCartEntry = async (
  user: User,
  product: Products,
  quantity: number
) => {
  const cartRepository = AppDataSource.getRepository(Cart);

  const newCartEntry = new Cart();
  newCartEntry.user = user;
  newCartEntry.product = product;
  newCartEntry.quantity = quantity;
  newCartEntry.subtotal = product.price * quantity;
  newCartEntry.discountApplied = 1; // yet to be populated
  newCartEntry.total = newCartEntry.subtotal - newCartEntry.discountApplied;
  newCartEntry.status = "Open";

  try {
    const cartEntry = await cartRepository.save(newCartEntry);
    return cartEntry;
  } catch (error) {
    console.error("Error adding product to Cart:", error);
    return null;
  }
};
