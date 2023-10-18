import request from "supertest";


import app from "../src/app";
import { AppDataSource } from "../src/data-source";

jest.mock("../src/service/productService");
const addToCartMock = addToCart as jest.Mock;


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


describe("Add Products to cart", () => {
  it("should return 201 when product and its qty added to cart", async () => {
    addToCartMock.mockResolvedValue({
        productId: 1,
        quantity: 2
    });

    const response = await request(app)
      .post("/api/webapp/user/:id/addToCart")
      .set('authorization', `Bearer ${token}`) 
      .send({ productId: "1", quantity: "2" });
    expect(response.status).toBe(201);
  });

  
//   it("should return 500 when product cannot be added", async () => {
//     addProductMock.mockRejectedValue(new Error("Error adding Product"));
    
//     const response = await request(app)
//       .post("/api/admin/product")
//       .set('authorization', `Bearer ${token}`) 
//     .send({ 
//       productName: "invalidproduct", 
//       price: "invalidprice",
//       quantity: "invalidquantity",
//       category: "invalidcategory", 
//       description: "invaliddescription"
//    });
//     expect(response.status).toBe(500);
//   });

//   it("should return 201 when product added successfully", async () => {
//     addProductMock.mockResolvedValue({
//       productName: "validproduct",
//       price: "validprice",
//       quantity: "validquantity",
//       category: "validcategory", 
//       description: "validdescription"
//     });
    
//     const response = await request(app)
//       .post("/api/admin/product")
//       .set('authorization', `Bearer ${token}`) 
//       .send({ 
//         productName: "validproduct", 
//         price: "validprice",
//         quantity: "validquantity",
//         category: "validcategory", 
//         description: "validdescription"
//      });
//     expect(response.status).toBe(201);
    
//   });
});
