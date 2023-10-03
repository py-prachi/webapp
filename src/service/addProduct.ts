
import { AppDataSource } from "../data-source";
import { Products } from "../entity/Products";

export const addProduct = async (
  productName: string,
  price: number,
  quantity:number
) => {
    const userRepository = AppDataSource.getRepository(Products)
  
    const newProduct = new Products();
    newProduct.product_name = productName;
    newProduct.price = price;
    newProduct.quantity = quantity;
    
    try {
      const product = await userRepository.save(newProduct);
      return product
    } catch (error) {
        console.error("Error adding user:", error);
        return null;
    }
};

//export default addProduct;
