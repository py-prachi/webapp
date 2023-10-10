import request from "supertest";
import { response } from "express";
import app from "../src/index";
import { apply, create, getAll, getDiscById, update } from "../src/service/discountService";
import { AppDataSource } from "../src/data-source";
import { Discount, DiscountType } from "../src/entity/discount";
import { ProductDiscount } from "../src/entity/ProductDiscounts";
import { getById } from "../src/service/productService";

describe("CRUD operations on Discount", () => {
  beforeAll(async () => {
    await AppDataSource.initialize();
  });

  afterAll(async () => {
    await AppDataSource.destroy();
  });

  it("should add a discount to the discount table", async () => {
    // given
        
    // when
    const discount = await create("Coupon1",DiscountType.FLAT,100,new Date("2023-10-09"),new Date("2023-10-19"));
    
    console.log("Discount: ", discount);
    
    // then
    expect(discount).toBeDefined();
    expect(discount!.discount_id).toBeDefined();
    expect(discount!.discount_rate).toBeDefined();
    expect(discount?.discount_type).toBeDefined();
    expect(discount?.status).toBeDefined();
    expect(discount!.description).toBeDefined();
    expect(discount!.endDate).toBeDefined();
    expect(discount!.startDate).toBeDefined();
    
    
  });

  it("should fetch all discounts from the discount table", async () => {
    await create("Coupon2",DiscountType.FLAT,100,new Date("2023-10-09"),new Date("2023-10-19"));
    await create("Coupon3",DiscountType.PERCENT,100,new Date("2023-10-19"),new Date("2023-10-29"));

    // Act
    const discount = await getAll();
    console.log(discount);
    // Assert
    expect(discount?.length).toBeGreaterThan(0);
  }); 


   it("should update specific discount", async () => {
    
    const discountId = 1
    // Act
    const discount = await update(1,"updatedCoupon",100,true, new Date("2023-10-19"),new Date("2023-10-29"));
    console.log(discount);
    // Assert
    expect(discount?.discount_id).toBe(discountId);
    expect(discount?.coupon).toBe("updatedCoupon");
    expect(discount?.status).toBe(true);

  }); 

  it("should apply discount to a product", async () => {
    const productId =  1;
    const discountId = 1;
    const product = await getById(productId);
    const discount = await getDiscById(discountId);
    console.log("product:", product);
    console.log("discount: ", discount)
    // when
    if (product && discount){
    const productDiscount = await apply(product,discount,new Date("2023-10-09"),new Date("2023-10-19"));
    console.log("ProductDiscount: ", productDiscount);  
    //then
    expect(productDiscount).toBeDefined();
    }
  });

});
