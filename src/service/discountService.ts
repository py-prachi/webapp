import { AppDataSource } from "../data-source"
import { Discount, DiscountType } from "../entity/discount";
import { ProductDiscount } from "../entity/ProductDiscounts";
import { Products } from "../entity/Products";

export const create = async (
  coupon: string,
  discount_type: DiscountType,
  discount_rate: number,
  startDate: Date,
  endDate: Date
) => {
  const discountRepository = AppDataSource.getRepository(Discount);

  const newDiscount = new Discount();
  newDiscount.coupon = coupon;
  newDiscount.discount_type = discount_type;
  newDiscount.discount_rate = discount_rate;
  newDiscount.startDate = startDate;
  newDiscount.endDate = endDate;

  try {
    const discount = await discountRepository.save(newDiscount);
    return discount;
  } catch (error) {
    console.error("Error adding discount:", error);
    return null;
  }
};

export const getAll = async () => {
  try {
    const discountRepository = AppDataSource.getRepository(Discount);
    const discount = await discountRepository.find();
    return discount;
  } catch (error) {
    console.error("Error fetching discount:", error);
    return null;
  }
};

export const getDiscById = async (discountId: number) => {
  try {
    console.log("In discount service for find by id:", discountId);
    const discountRepository = AppDataSource.getRepository(Discount);
    const discount = await discountRepository.findOne({
      where: { discount_id: discountId },
    });
    return discount;
  } catch (error) {
    console.error(`Error fetching product by id (${discountId}):`, error);
    return null;
  }
};

export const update = async (
  discountId: number,
  coupon: string,
  discount_rate: number,
  status: boolean,
  startDate: Date,
  endDate: Date
) => {
  try {
    console.log("data received in update Product service: ", discountId);
    const discountRepository = AppDataSource.getRepository(Discount);
    const discount_to_update = await discountRepository.findOne({
      where: { discount_id: discountId },
    });

    if (!discount_to_update) return null;

    discount_to_update.coupon = coupon;
    discount_to_update.discount_rate = discount_rate;
    discount_to_update.status = status;
    discount_to_update.startDate = startDate;
    discount_to_update.endDate = endDate;

    await discountRepository.save(discount_to_update);
    return discount_to_update;
  } catch (error) {
    console.error(`Error updating product:`, error);
    return null;
  }
};

export const apply = async (
  product: Products,
  discount: Discount,
  applyDate: Date,
  endDate: Date
) => {
  const productDiscountRepository =
    AppDataSource.getRepository(ProductDiscount);

  const newProductDiscount = new ProductDiscount();
  newProductDiscount.product = product;
  newProductDiscount.discount = discount;
  newProductDiscount.apply_date = applyDate;
  newProductDiscount.end_date = endDate;

  try {
    const productDiscount =
      await productDiscountRepository.save(newProductDiscount);
    return productDiscount;
  } catch (error) {
    console.error("Error applying discount to Product:", error);
    return null;
  }
};


export const getProductDiscount = async (productId:number) => {
  try {
    console.log("In Product Discount service to find discount for product:",productId);
    const productDiscountRepository = AppDataSource.getRepository(ProductDiscount);
    const discount = await productDiscountRepository.find({
      where: { product: { product_id: productId } },
    });
    return discount;
  } catch (error) {
    console.error(`Error fetching product by id (${productId}):`, error);
    return null;
  }
};


