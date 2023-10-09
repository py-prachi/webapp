import { DeleteResult } from "typeorm";
import { AppDataSource } from "../data-source";
import { Discount } from "../entity/discount";
import { EnumType } from "typescript";


export const create = async (
  coupon: string,
  //discount_type: string,
  discount_rate:number,
  startDate: Date,
  endDate:Date
) => {
    const discountRepository = AppDataSource.getRepository(Discount)
  
    const newDiscount = new Discount();
    newDiscount.coupon = coupon;
    //newDiscount.discount_type = discount_type;
    newDiscount.discount_rate = discount_rate;
    newDiscount.startDate = startDate;
    newDiscount.endDate = endDate;
    
    try {
      const discount = await discountRepository.save(newDiscount);
      return discount
    } catch (error) {
        console.error("Error adding discount:", error);
        return null;
    }
};

export const getAll = async ()=> {
    try {
        const discountRepository = AppDataSource.getRepository(Discount)
        const discount = await discountRepository.find();
        return discount
    } catch (error) {
        console.error("Error fetching discount:", error);
        return null;
    }
};

export const getDiscById = async (discountId:number)=> {
    try {
        console.log("In discount service for find by id:", discountId);
        const discountRepository = AppDataSource.getRepository(Discount)
        const discount = await discountRepository.findOne({ where: { discount_id: discountId } });
        return discount
    } catch (error) {
        console.error(`Error fetching product by id (${discountId}):`, error);
        return null;
    }
};
// export const del = async (productId:number)=> {
//     try {
//         console.log("In product service for delete by id:", productId);
//         const productRepository = AppDataSource.getRepository(Products)
//         const product_to_delete = await productRepository.findOne({ where: { product_id: productId } });
//         console.log("found prod to delete: ", product_to_delete);
        
//         if (!product_to_delete){
//             console.log("product id not found: ", productId)
//             return null}
        
//         const deletionResult: DeleteResult = await productRepository.delete(productId);
//         return deletionResult.affected === 1;
//     } catch (error) {
//         console.error(`Error fetching product by id (${productId}):`, error);
//         return null;
//     }
// };

  

// export const update = async (
//     productId:number,
//     productName: string,
//     price: number,
//     quantity:number) => {
    
//     try {
//         console.log("data received in update Product service: ",productId);
//         const productRepository = AppDataSource.getRepository(Products)
//         const product_to_update = await productRepository.findOne({ where: { product_id: productId } });
        
//         if (!product_to_update)
//             return null

//         product_to_update.product_name = productName;
//         product_to_update.price = price;
//         product_to_update.quantity = quantity;

//         await productRepository.save(product_to_update);
//         return product_to_update;

//     } catch (error) {
//         console.error(`Error updating product:`, error);
//         return null;
//     }
// };

