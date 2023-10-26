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
    // const discounts = await ProductDiscountRepository.find({
    //   where:{product:{product_id:productId}}
    // })
    // const productDiscounts = await productDiscountRepository
    //   .createQueryBuilder("productDiscount")
    //   .where("productDiscount.product = :productId", { productId })
    //   .getMany();
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
