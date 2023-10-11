import request from "supertest";
import { response } from "express";
import app from "../src/app";
import { create, del, getAll, getById, update } from "../src/service/productService";
import { AppDataSource } from "../src/data-source";
import { Products } from "../src/entity/Products";

describe("CRUD operations on Product", () => {
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
    const product = await create(productName,price,quantity);
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

  it("should fetch all products from the product table", async () => {
    await create("Product2",1000,10);
    await create("Product3",1000,10);

    // Act
    const products = await getAll();
    console.log(products);
    // Assert
    expect(products?.length).toBeGreaterThan(0);
  }); 

  it("should fetch specific product from the product table", async () => {
    
    const productId = 1
    // Act
    const products = await getById(productId);
    console.log(products);
    // Assert
    expect(products?.product_id).toBe(productId);
  }); 

  it("should update specific product", async () => {
    
    const productId = 1
    // Act
    const products = await update(1,"updated_product",100,10);
    console.log(products);
    // Assert
    expect(products?.product_id).toBe(productId);
    expect(products?.product_name).toBe("updated_product");

  }); 
  it("should delete specific product", async () => {
    
    const productId = 3
    // Act
    const deleted_product_status = await del(productId);
    console.log(deleted_product_status);
    // Assert
    expect(deleted_product_status).toBe(true);
   
    
  }); 
  

});
