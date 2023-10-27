import { DeleteResult } from "typeorm";
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
  console.log("in create cart entry service!");
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

export const getProductDiscount = async (productId: number) => {
  try {
    console.log("in get product-discount service", productId);
    const productDiscountRepository =
      AppDataSource.getRepository(ProductDiscount);

    const productDiscounts = await productDiscountRepository
      .createQueryBuilder("productDiscount")
      .leftJoinAndSelect("productDiscount.product", "product")
      .leftJoinAndSelect("productDiscount.discount", "discount")
      .where("product.product_id = :productId", { productId: productId })
      .getMany();
    return productDiscounts;
  } catch (error) {
    console.error("Error fetching discount:", error);
    return null;
  }
};

export const getCart = async (userId: number) => {
  try {
    console.log("in get Cart service", userId);
    const cartRepository = AppDataSource.getRepository(Cart);

    const cart = await cartRepository
      .createQueryBuilder("cart")
      .leftJoinAndSelect("cart.product", "product")
      .where("cart.user_id = :userId", { userId: userId })
      .getMany();
    return cart;
  } catch (error) {
    console.error(
      `Error fetching product from cart for user: (${userId}):`,
      error
    );
    return null;
  }
};

export const delCart = async (userId: number) => {
  try {
    console.log("In cart service for delete by Userid:", userId);
    const cartRepository = AppDataSource.getRepository(Cart);
    const deletionResult = await cartRepository
      .createQueryBuilder()
      .delete()
      .from(Cart)
      .where("user_id = :userId", { userId: userId })
      .execute();
    console.log("found prod to delete: ", deletionResult);

    if (!deletionResult) {
      console.log("User id not found: ", userId);
      return null;
    }
  } catch (error) {
    console.error(`Error fetching cart by  user id (${userId}):`, error);
    return null;
  }
};
