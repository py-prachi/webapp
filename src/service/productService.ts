import { DeleteResult, ILike, Like } from "typeorm";
import { AppDataSource } from "../data-source";
import { Products } from "../entity/Products";

export const createProduct = async (
  productName: string,
  price: number,
  quantity: number,
  category?: string | undefined,
  description?: string | undefined
) => {
  console.log("in create Product service!!");
  const productRepository = AppDataSource.getRepository(Products);

  const newProduct = new Products();
  newProduct.product_name = productName;
  newProduct.price = price;
  newProduct.quantity = quantity;
  newProduct.category = category || undefined;
  newProduct.description = description || undefined;

  try {
    const product = await productRepository.save(newProduct);
    return product;
  } catch (error) {
    console.error("Error adding user:", error);
    return null;
  }
};

export const getAllProducts = async () => {
  try {
    console.log("in Get all products service!!")
    const productRepository = AppDataSource.getRepository(Products);
    const product = await productRepository.find();
    return product;
  } catch (error) {
    console.error("Error fetching products:", error);
    return null;
  }
};

export const getById = async (productId: number) => {
  try {
    console.log("In product service for find by id:", productId);
    const productRepository = AppDataSource.getRepository(Products);
    const product = await productRepository.findOne({
      where: { product_id: productId },
    });
    return product;
  } catch (error) {
    console.error(`Error fetching product by id (${productId}):`, error);
    return null;
  }
};
export const del = async (productId: number) => {
  try {
    console.log("In product service for delete by id:", productId);
    const productRepository = AppDataSource.getRepository(Products);
    const product_to_delete = await productRepository.findOne({
      where: { product_id: productId },
    });
    console.log("found prod to delete: ", product_to_delete);

    if (!product_to_delete) {
      console.log("product id not found: ", productId);
      return null;
    }

    const deletionResult: DeleteResult =
      await productRepository.delete(productId);
    return deletionResult.affected === 1;
  } catch (error) {
    console.error(`Error fetching product by id (${productId}):`, error);
    return null;
  }
};

export const update = async (
  productId: number,
  productName: string,
  price: number,
  quantity: number
) => {
  try {
    console.log("data received in update Product service: ", productId);
    const productRepository = AppDataSource.getRepository(Products);
    const product_to_update = await productRepository.findOne({
      where: { product_id: productId },
    });

    if (!product_to_update) return null;

    product_to_update.product_name = productName;
    product_to_update.price = price;
    product_to_update.quantity = quantity;

    await productRepository.save(product_to_update);
    return product_to_update;
  } catch (error) {
    console.error(`Error updating product:`, error);
    return null;
  }
};

export const search = async (
  productName: string | undefined,
  category: string | undefined,
  description: string | undefined
) => {
  try {
    console.log("In search function....", productName, category, description);

    const product = await AppDataSource.getRepository(Products)
      .createQueryBuilder("product")
      .where("product.product_name ILIKE :productName", {
        productName: `%${productName}%`,
      })
      .orWhere("product.category ILIKE :category", {
        category: `%${category}%`,
      })
      .orWhere("product.description ILIKE :description", {
        description: `%${description}%`,
      })
      .getMany();

    return product;
  } catch (error) {
    console.error(`Error searching product`, error);
    return null;
  }
};
