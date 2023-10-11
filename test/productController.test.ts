import request from "supertest";
import { response } from "express";
import { create, getById, getAll, del, update } from "../src/service/productService";
import app from "../src/app";
import { AppDataSource } from "../src/data-source";

jest.mock("../src/service/productService");
const addProductMock = create as jest.Mock;

jest.mock("../src/service/productService");
const getProductMock = getAll as jest.Mock;

jest.mock("../src/service/productService");
const getProductByIdMock = getById as jest.Mock;

jest.mock("../src/service/productService");
const deleteProductMock = del as jest.Mock;

jest.mock("../src/service/productService");
const updateProductMock = update as jest.Mock;



jest.mock("../src/data-source");

const mockDataSource = jest.spyOn(AppDataSource, 'initialize');
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6InRlc3QyIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjk2MzI4OTEyfQ.bAoI6Zst1SFxuaagid_41vtiS7NlwjHmwgWoG-GXHnw";

beforeAll(async () => {
 
});

afterAll(async () => {
  mockDataSource.mockRestore();
  jest.clearAllMocks();
});

beforeEach(() => {
  jest.resetModules();
});

afterEach(() => {
  jest.clearAllMocks();
});


describe("Add Products", () => {
  it("should return 400 when no product name or price or quantity passed", async () => {
    const response = await request(app)
      .post("/api/admin/product")
      .set('authorization', `Bearer ${token}`) 
      .send({ productName: "", price: "", quantity: "" });
    expect(response.status).toBe(400);
  });

  
  it("should return 500 when product cannot be added", async () => {
    addProductMock.mockRejectedValue(new Error("Error adding Product"));
    
    const response = await request(app)
      .post("/api/admin/product")
      .set('authorization', `Bearer ${token}`) 
    .send({ 
      productName: "invalidproduct", 
      price: "invalidprice",
      quantity: "invalidquantity"
   });
    expect(response.status).toBe(500);
  });

  it("should return 201 when product added successfully", async () => {
    addProductMock.mockResolvedValue({
      productName: "validproduct",
      price: "validprice",
      quantity: "validquantity"
    });
    
    const response = await request(app)
      .post("/api/admin/product")
      .set('authorization', `Bearer ${token}`) 
      .send({ 
        productName: "validproduct", 
        price: "validprice",
        quantity: "validquantity"
     });
    expect(response.status).toBe(201);
    
  });
});

describe('Get all Products', ()=> {

  it("should return 200 and display all the products from catalog",async()=>{
    getProductMock.mockResolvedValue([
      {productName: 'Product1', price: 10, quantity: 5 },
      {productName: 'Product2', price: 20, quantity: 25 },
    ]);
    const response = await request(app)
      .get("/api/admin/product")
      .set('authorization', `Bearer ${token}`) 
      
    expect(response.status).toBe(200);
    
  })

  it("should return 404 when NO products are found in catalog",async()=>{
    getProductMock.mockResolvedValueOnce([]);
    const response = await request(app)
      .get("/api/admin/product")
      .set('authorization', `Bearer ${token}`) 
      
    expect(response.status).toBe(404);
  })

  it("should return 500 when product cannot be fetched ",async()=>{
    getProductMock.mockRejectedValue(new Error("Error fetching Product"));
    
    const response = await request(app)
      .get("/api/admin/product")
      .set('authorization', `Bearer ${token}`) 
    
    expect(response.status).toBe(500);
  })

});

describe('Get Products by ID', ()=> {

  it("should return 200 and display all the products from catalog",async()=>{
    getProductByIdMock.mockResolvedValue([
      {productId: 1, productName: 'Product1', price: 10, quantity: 5 },
      ]);
    const productId = 1 ;
    const response = await request(app)
      .get(`/api/admin/product/${productId}`)
      .set('authorization', `Bearer ${token}`) 
      
    expect(response.status).toBe(200);
    
  })

  it("should return 404 when product NOT found in catalog",async()=>{
    getProductMock.mockResolvedValueOnce([]);
    const productId = 1 ;
    const response = await request(app)
      .get(`/api/admin/product/${productId}`)
      .set('authorization', `Bearer ${token}`) 
      
    expect(response.status).toBe(404);
    
  })

  it("should return 400 when product id is invalid",async()=>{
   
    const invalidProductId = "invalid-product-id"
    const response = await request(app)
      .get(`/api/admin/product/${invalidProductId}`)
      .set('authorization', `Bearer ${token}`) 
      
    expect(response.status).toBe(400);
  })

  it("should return 500 when product cannot be fetched ",async()=>{
    
    getProductByIdMock.mockRejectedValue(new Error("Error fetching Product"));

    const invalidProductId = 101
    const response = await request(app)
      .get(`/api/admin/product/${invalidProductId}`)
      .set('authorization', `Bearer ${token}`) 
    
    expect(response.status).toBe(500);
  })
});



describe('Update Product', ()=> {

  
  it("should return 204 when product updated successfully", async () => {
    updateProductMock.mockResolvedValue({
      productId: 1,
      productName: "validproduct",
      price: "validprice",
      quantity: "validquantity"
    });
    
    const productId = 1;
    const response = await request(app)
      .put(`/api/admin/product/${productId}`)
      .set('authorization', `Bearer ${token}`) 
      .send({ 
        productName: "validproduct", 
        price: "validprice",
        quantity: "validquantity"
     });
    expect(response.status).toBe(204);
    
  
});

  it("should return 400 when product id is invalid",async()=>{
    updateProductMock.mockResolvedValue([]);
    const invalidProductId = "invalid-product-id" ;
    const response = await request(app)
      .put(`/api/admin/product/${invalidProductId}`)
      .set('authorization', `Bearer ${token}`) 
      .send({ 
        productName: "validproduct", 
        price: "validprice",
        quantity: "validquantity"});
      
    expect(response.status).toBe(400);
    
  })
  it("should return 400 when no product name or price or quantity passed", async () => {
    const productId = 1;    
    const response = await request(app)
      .put(`/api/admin/product/${productId}`)
      .set('authorization', `Bearer ${token}`) 
      .send({ productName: "", price: "", quantity: "" });
    
      expect(response.status).toBe(400);
  });

  it("should return 404 when product NOT found in catalog",async()=>{
    updateProductMock.mockResolvedValueOnce([]);
    const productId = 1 ;
    const response = await request(app)
      .get(`/api/admin/product/${productId}`)
      .set('authorization', `Bearer ${token}`) 
      .send({ 
        productName: "validproduct", 
        price: "validprice",
        quantity: "validquantity"});

    expect(response.status).toBe(404);
    
  })

  it("should return 500 when product cannot be updated", async () => {
    updateProductMock.mockRejectedValue(new Error("Error updating Product"));
    const productId = 1 ;
    const response = await request(app)
      .put(`/api/admin/product/${productId}`)
      .set('authorization', `Bearer ${token}`) 
    .send({ 
      productName: "invalidproduct", 
      price: "invalidprice",
      quantity: "invalidquantity"
   });
    expect(response.status).toBe(500);
  });
});

describe('Delete Product', ()=> {

  it("should return 400 when product id is invalid",async()=>{
    const invalidProductId = "invalid-product-id"
    const response = await request(app)
      .delete(`/api/admin/product/${invalidProductId}`)
      .set('authorization', `Bearer ${token}`) 
      
    expect(response.status).toBe(400);
  });

//   it("should return 404 when product NOT found in catalog",async()=>{
    
//     deleteProductMock.mockReturnValue([]);
//     const productId = 1 ;
//     const response = await request(app)
//       .delete(`/api/admin/product/${productId}`)
//       .set('authorization', `Bearer ${token}`) 
    
      
//     expect(response.status).toBe(404);
  
// });

  it("should return 204 when product deleted successfully",async()=>{
    deleteProductMock.mockResolvedValue([
      {productId: 1, productName: 'Product1', price: 10, quantity: 5 },
      ]);
    const productId = 1 ;

    const response = await request(app)
      .delete(`/api/admin/product/${productId}`)
      .set('authorization', `Bearer ${token}`) 
      
    expect(response.status).toBe(204);
    
  });

  it("should return 500 when product cannot be delete ",async()=>{
    
    deleteProductMock.mockRejectedValue(new Error("Error deleting Product"));
    const invalidProductId = 101
    
    const response = await request(app)
    .delete(`/api/admin/product/${invalidProductId}`)
    .set('authorization', `Bearer ${token}`) 
      
    
    expect(response.status).toBe(500);
  });
});