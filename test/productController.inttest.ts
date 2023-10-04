import request from "supertest";
import { response } from "express";
import app from "../src/index";
import { addProduct } from "../src/service/productService";
import { AppDataSource } from "../src/data-source";
import { Products } from "../src/entity/Products";

describe("Add Product Function", () => {
  beforeAll(async () => {
    await AppDataSource.initialize();
  });

  afterAll(async () => {
    await AppDataSource.destroy();
  });

  it("should add a product to the product table", async () => {
    // given
    const productName = "product1";
    const price = 100 ;
    const quantity = 10 ;
    
    // when
    const product = await addProduct(productName,price,quantity);
    console.log("Product: ", product);
    
    // then
    expect(product).toBeDefined();
    expect(product!.product_name).toBe(productName);
    expect(product!.price).toBe(price);
    expect(product!.quantity).toBe(quantity);
    expect(product!.product_id).toBeDefined();
    expect(product!.product_status).toBe('available');
    expect(product!.description).toBeDefined();
    expect(product!.category).toBeDefined();
    expect(product!.specifications).toBeDefined();
    expect(product!.created_at).toBeDefined();
    expect(product!.updated_at).toBeDefined();  
  });
});
