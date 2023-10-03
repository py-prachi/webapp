import request from "supertest";
import { response } from "express";
import { addProduct } from "../src/service/addProduct";
import app from "../src/index";
import { AppDataSource } from "../src/data-source";

jest.mock("../src/service/addProduct");
const addProductMock = addProduct as jest.Mock;

jest.mock("../src/data-source");

const mockDataSource1 = jest.spyOn(AppDataSource, 'initialize');
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6InRlc3QyIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjk2MzI4OTEyfQ.bAoI6Zst1SFxuaagid_41vtiS7NlwjHmwgWoG-GXHnw";

beforeAll(async () => {
 
});

afterAll(async () => {
  mockDataSource1.mockRestore();
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
      .post("/api/webapp/product/add")
      .set('Authorization', `Bearer ${token}`) 
      .send({ productName: "", price: "", quantity: "" });
    expect(response.status).toBe(400);
  });

  
  it("should return 500 when product cannot be added", async () => {
    addProductMock.mockRejectedValue(new Error("Error adding Product"));
    
    const response = await request(app)
      .post("/api/webapp/product/add")
      .set('Authorization', `Bearer ${token}`) 
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
      .post("/api/webapp/product/add")
      .set('Authorization', `Bearer ${token}`) 
      .send({ 
        productName: "validproduct", 
        price: "validprice",
        quantity: "validquantity"
     });
    expect(response.status).toBe(201);
    
  });
});


