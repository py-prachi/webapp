import { DeleteResult } from "typeorm";
import { AppDataSource } from "../data-source";
import { Products } from "../entity/Products";
import { UpdateResult } from "typeorm/driver/mongodb/typings";

export const create = async (
  productName: string,
  price: number,
  quantity:number
) => {
    const productRepository = AppDataSource.getRepository(Products)
  
    const newProduct = new Products();
    newProduct.product_name = productName;
    newProduct.price = price;
    newProduct.quantity = quantity;
    
    try {
      const product = await productRepository.save(newProduct);
      return product
    } catch (error) {
        console.error("Error adding user:", error);
        return null;
    }
};

export const getAll = async ()=> {
    try {
        const productRepository = AppDataSource.getRepository(Products)
        const product = await productRepository.find();
        return product
    } catch (error) {
        console.error("Error fetching products:", error);
        return null;
    }
};

export const getById = async (productId:number)=> {
    try {
        console.log("In product service for find by id:", productId);
        const productRepository = AppDataSource.getRepository(Products)
        const product = await productRepository.findOne({ where: { product_id: productId } });
        return product
    } catch (error) {
        console.error(`Error fetching product by id (${productId}):`, error);
        return null;
    }
};
export const del = async (productId:number)=> {
    try {
        console.log("In product service for delete by id:", productId);
        const productRepository = AppDataSource.getRepository(Products)
        const product_to_delete = await productRepository.findOne({ where: { product_id: productId } });
        console.log("found prod to delete: ", product_to_delete);
        
        if (!product_to_delete){
            console.log("product id not found: ", productId)
            return null}
        
        const deletionResult: DeleteResult = await productRepository.delete(productId);
        return deletionResult.affected === 1;
    } catch (error) {
        console.error(`Error fetching product by id (${productId}):`, error);
        return null;
    }
};

  

export const update = async (
    productId:number,
    productName: string,
    price: number,
    quantity:number) => {
    
    try {
        console.log("data received in update Product service: ",productId);
        const productRepository = AppDataSource.getRepository(Products)
        const product_to_update = await productRepository.findOne({ where: { product_id: productId } });
        
        if (!product_to_update)
            return null

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

