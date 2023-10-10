import request from "supertest";

import { apply, create, getAll, update } from "../src/service/discountService";
import app from "../src/index";
import { AppDataSource } from "../src/data-source";
import { Discount, DiscountType } from "../src/entity/discount";
import { Products } from "../src/entity/Products";

jest.mock("../src/service/discountService");
const addDiscountMock = create as jest.Mock;

jest.mock("../src/service/discountService");
const getDiscountMock = getAll as jest.Mock;

jest.mock("../src/service/discountService");
const updateDiscountMock = update as jest.Mock;

jest.mock("../src/service/discountService");
const productDiscountMock = apply as jest.Mock;



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


describe("Add Discounts", () => {
  it("should return 400 when coupon or discount Rate missing", async () => {
    const response = await request(app)
      .post("/api/admin/discount")
      .set('authorization', `Bearer ${token}`) 
      .send({ coupon: "", discount_rate: "" });
    expect(response.status).toBe(400);
  });

  // it("should return 400 when discount type is not flat or percent", async () => {
  //   const response = await request(app)
  //     .post("/api/admin/discount")
  //     .set('authorization', `Bearer ${token}`) 
  //     .send({ 
  //       coupon: "valid",
  //       discount_type: "invalid",
  //       discount_rate: "valid" 
  //        });
  //   expect(response.status).toBe(400);
  // });

  
  it("should return 500 when discount cannot be added", async () => {
    addDiscountMock.mockRejectedValue(new Error("Error adding Discount"));
    
    const response = await request(app)
      .post("/api/admin/discount")
      .set('authorization', `Bearer ${token}`) 
    .send({ 
      coupon: "invalidcoupon", 
      discount_type: DiscountType.FLAT,
      discount_rate: "invalidrate",
      startDate: "invalidstartDate",
      endDate: "invalidendDate"
   });
    expect(response.status).toBe(500);
  });

  it("should return 201 when product added successfully", async () => {
    addDiscountMock.mockResolvedValue({
      coupon: "validcoupon",
      discount_type: DiscountType.FLAT,
      discount_rate: "validrate",
      startDate: "validstartDate",
      endDate: "validendDate"
    });
    
    const response = await request(app)
      .post("/api/admin/discount")
      .set('authorization', `Bearer ${token}`) 
      .send({ 
        coupon: "validcoupon",
        discount_type: DiscountType.FLAT,
        discount_rate: "validrate",
        startDate: "validstartDate",
        endDate: "validendDate"
     });
    expect(response.status).toBe(201);
    
  });
});

describe('Get all Discounts', ()=> {

  it("should return 200 and display all the discounts from catalog",async()=>{
    getDiscountMock.mockResolvedValue([
        {coupon: "coupon1",
        discount_type: "flat",
        discount_rate: "validprice",
        startDate: "validstartDate",
        endDate: "validendDate"},
        {coupon: "coupon2",
        discount_type: "percent",
        discount_rate: "validprice",
        startDate: "validstartDate",
        endDate: "validendDate"},
    ]);
    const response = await request(app)
      .get("/api/admin/discount")
      .set('authorization', `Bearer ${token}`) 
      
    expect(response.status).toBe(200);
    
  })

  it("should return 404 when NO products are found in catalog",async()=>{
    getDiscountMock.mockResolvedValueOnce([]);
    const response = await request(app)
      .get("/api/admin/discount")
      .set('authorization', `Bearer ${token}`) 
      
    expect(response.status).toBe(404);
  })

  it("should return 500 when product cannot be fetched ",async()=>{
    getDiscountMock.mockRejectedValue(new Error("Error fetching Product"));
    
    const response = await request(app)
      .get("/api/admin/discount")
      .set('authorization', `Bearer ${token}`) 
    
    expect(response.status).toBe(500);
  })

});




describe('Update Product', ()=> {

  
  it("should return 204 when discount updated successfully", async () => {
    updateDiscountMock.mockResolvedValue({
        coupon: "coupon1",
        discount_type: "flat",
        discount_rate: "validprice",
        startDate: "validstartDate",
        endDate: "validendDate"
    });
    
    const discountId = 1;
    const response = await request(app)
      .put(`/api/admin/discount/${discountId}`)
      .set('authorization', `Bearer ${token}`) 
      .send({ 
        coupon: "validcoupon",
        discount_type: "flat",
        discount_rate: "validrate",
        startDate: "validstartDate",
        endDate: "validendDate"
     });
    expect(response.status).toBe(200);
    
  
});

  it("should return 400 when discount id is invalid",async()=>{
    updateDiscountMock.mockResolvedValue([]);
    const invalidDiscountId = "invalid-discount-id" ;
    const response = await request(app)
      .put(`/api/admin/discount/${invalidDiscountId}`)
      .set('authorization', `Bearer ${token}`) 
      .send({ 
        coupon: "validcoupon",
        discount_type: "flat",
        discount_rate: "validrate",
        startDate: "validstartDate",
        endDate: "validendDate"});
      
    expect(response.status).toBe(400);
    
  })
  it("should return 400 when no coupon name or rate passed", async () => {
    const discountId = 1;    
    const response = await request(app)
      .put(`/api/admin/discount/${discountId}`)
      .set('authorization', `Bearer ${token}`) 
      .send({ coupon: "", discount_rate: "" });
    
      expect(response.status).toBe(400);
  });

  it("should return 404 when discount NOT found in catalog",async()=>{
    updateDiscountMock.mockResolvedValueOnce([]);
    const discountId = 101 ;
    const response = await request(app)
      .get(`/api/admin/discount/${discountId}`)
      .set('authorization', `Bearer ${token}`) 
      .send({ 
        coupon: "validcoupon",
        discount_type: "flat",
        discount_rate: "validrate",
        startDate: "validstartDate",
        endDate: "validendDate"});

    expect(response.status).toBe(404);
    
  })

  it("should return 500 when discount cannot be updated", async () => {
    updateDiscountMock.mockRejectedValue(new Error("Error updating Discount"));
    const discountId = 1 ;
    const response = await request(app)
      .put(`/api/admin/discount/${discountId}`)
      .set('authorization', `Bearer ${token}`) 
    .send({ 
        coupon: "invalidcoupon", 
        discount_type: "valid",
        discount_rate: "invalidrate",
        startDate: "invalidstartDate",
        endDate: "invalidendDate"
   });
    expect(response.status).toBe(500);
  });
});

describe("Apply Discount",()=>{

  // it("Should apply discount to product",async()=>{
  //   productDiscountMock.mockResolvedValue({
  //     product: Products,
  //     discount: Discount,
  //     applyDate: "validapplyDate",
  //     endDate: "validendDate"
  // });
  
  // const discountId = 1;
  // const productId = 1;
  // const response = await request(app)
  //   .put(`/api/admin/product/${productId}/discount/${discountId}`)
  //   .set('authorization', `Bearer ${token}`) 
  //   .send({ 
  //     product: Products,
  //     discount: Discount,
  //     applyDate: "validapplyDate",
  //     endDate: "validendDate"
  //  });
  // expect(response.status).toBe(200);
//});

});

