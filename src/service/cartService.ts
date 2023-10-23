import { AppDataSource } from "../data-source";
import { Cart } from "../entity/Cart";
import { ProductDiscount } from "../entity/ProductDiscounts";
import { Products } from "../entity/Products";
import { User } from "../entity/User";

export const createCartEntry = async (
  user: User,
  product: Products,
  quantity: number,
  discountApplied: number
) => {
  const cartRepository = AppDataSource.getRepository(Cart);

  const newCartEntry = new Cart();
  newCartEntry.user = user;
  newCartEntry.product = product;
  newCartEntry.quantity = quantity;
  newCartEntry.subtotal = product.price * quantity;
  newCartEntry.discountApplied = discountApplied * quantity; 
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

export const getProductDiscount = async (
    productId: number
  ) => {
    try {
      const ProductDiscountRepository = AppDataSource.getRepository(ProductDiscount);
      const discounts = await ProductDiscountRepository.find({
        where:{product:{product_id:productId}}
      })
        return discounts;
    } catch (error) {
      console.error("Error fetching discount:", error);
      return null;
    }
  };