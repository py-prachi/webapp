import request from "supertest";

import {
  apply,
  create,
  getAll,
  getDiscById,
  update,
} from "../src/service/discountService";
import app from "../src/app";
import { AppDataSource } from "../src/data-source";
import { Discount, DiscountType } from "../src/entity/discount";
import { Products } from "../src/entity/Products";
import { getById } from "../src/service/productService";

jest.mock("../src/service/discountService");
const addDiscountMock = create as jest.Mock;

jest.mock("../src/service/discountService");
const getDiscountMock = getAll as jest.Mock;

jest.mock("../src/service/discountService");
const updateDiscountMock = update as jest.Mock;

jest.mock("../src/service/discountService");
const addproductDiscountMock = apply as jest.Mock;

jest.mock("../src/service/productService");
const getProductByIdMock = getById as jest.Mock;

jest.mock("../src/service/discountService");
const getDiscByIdMock = getDiscById as jest.Mock;

jest.mock("../src/data-source");

const mockDataSource = jest.spyOn(AppDataSource, "initialize");
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6InRlc3QyIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjk2MzI4OTEyfQ.bAoI6Zst1SFxuaagid_41vtiS7NlwjHmwgWoG-GXHnw";

beforeAll(async () => {});

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
      .set("authorization", `Bearer ${token}`)
      .send({ coupon: "", discount_rate: "" });
    expect(response.status).toBe(400);
  });

  it("should return 400 when discount type is not flat or percent", async () => {
    const response = await request(app)
      .post("/api/admin/discount")
      .set("authorization", `Bearer ${token}`)
      .send({
        coupon: "valid",
        discount_type: "invalid",
        discount_rate: "valid",
      });
    expect(response.status).toBe(400);
  });

  it("should return 500 when discount cannot be added", async () => {
    addDiscountMock.mockRejectedValue(new Error("Error adding Discount"));

    const response = await request(app)
      .post("/api/admin/discount")
      .set("authorization", `Bearer ${token}`)
      .send({
        coupon: "invalidcoupon",
        discount_type: DiscountType.FLAT,
        discount_rate: "invalidrate",
        status: true,
        startDate: "invalidstartDate",
        endDate: "invalidendDate",
      });
    expect(response.status).toBe(500);
  });

  it("should return 201 when product added successfully", async () => {
    addDiscountMock.mockResolvedValue({
      coupon: "validcoupon",
      discount_type: DiscountType.PERCENT,
      discount_rate: "validrate",
      status: true,
      startDate: "validstartDate",
      endDate: "validendDate",
    });

    const response = await request(app)
      .post("/api/admin/discount")
      .set("authorization", `Bearer ${token}`)
      .send({
        coupon: "validcoupon",
        discount_type: DiscountType.PERCENT,
        discount_rate: "validrate",
        status: true,
        startDate: "validstartDate",
        endDate: "validendDate",
      });
    expect(response.status).toBe(201);
  });
});

describe("Get all Discounts", () => {
  it("should return 200 and display all the discounts from catalog", async () => {
    getDiscountMock.mockResolvedValue([
      {
        coupon: "coupon1",
        discount_type: "flat",
        discount_rate: "validprice",
        status: true,
        startDate: "validstartDate",
        endDate: "validendDate",
      },
      {
        coupon: "coupon2",
        discount_type: "percent",
        discount_rate: "validprice",
        status: false,
        startDate: "validstartDate",
        endDate: "validendDate",
      },
    ]);
    const response = await request(app)
      .get("/api/admin/discount")
      .set("authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
  });

  it("should return 404 when NO discounts are found in catalog", async () => {
    getDiscountMock.mockResolvedValueOnce([]);
    const response = await request(app)
      .get("/api/admin/discount")
      .set("authorization", `Bearer ${token}`);

    expect(response.status).toBe(404);
  });

  it("should return 500 when discount cannot be fetched ", async () => {
    getDiscountMock.mockRejectedValue(new Error("Error fetching Discount"));

    const response = await request(app)
      .get("/api/admin/discount")
      .set("authorization", `Bearer ${token}`);

    expect(response.status).toBe(500);
  });
});

describe("Update Discount", () => {
  it("should return 204 when discount updated successfully", async () => {
    updateDiscountMock.mockResolvedValue({
      coupon: "coupon1",
      discount_type: "flat",
      discount_rate: "validprice",
      status: true,
      startDate: "validstartDate",
      endDate: "validendDate",
    });

    const discountId = 1;
    const response = await request(app)
      .put(`/api/admin/discount/${discountId}`)
      .set("authorization", `Bearer ${token}`)
      .send({
        coupon: "validcoupon",
        discount_type: "flat",
        discount_rate: "validrate",
        status: true,
        startDate: "validstartDate",
        endDate: "validendDate",
      });
    expect(response.status).toBe(200);
  });

  it("should return 400 when discount id is invalid", async () => {
    updateDiscountMock.mockResolvedValue([]);
    const invalidDiscountId = "invalid-discount-id";
    const response = await request(app)
      .put(`/api/admin/discount/${invalidDiscountId}`)
      .set("authorization", `Bearer ${token}`)
      .send({
        coupon: "validcoupon",
        discount_type: "flat",
        discount_rate: "validrate",
        status: true,
        startDate: "validstartDate",
        endDate: "validendDate",
      });

    expect(response.status).toBe(400);
  });
  it("should return 400 when no coupon name or rate passed", async () => {
    const discountId = 1;
    const response = await request(app)
      .put(`/api/admin/discount/${discountId}`)
      .set("authorization", `Bearer ${token}`)
      .send({ coupon: "", discount_rate: "" });

    expect(response.status).toBe(400);
  });

  it("should return 404 when discount NOT found in catalog", async () => {
    updateDiscountMock.mockResolvedValueOnce([]);
    const discountId = 101;
    const response = await request(app)
      .get(`/api/admin/discount/${discountId}`)
      .set("authorization", `Bearer ${token}`)
      .send({
        coupon: "validcoupon",
        discount_type: "flat",
        discount_rate: "validrate",
        status: true,
        startDate: "validstartDate",
        endDate: "validendDate",
      });

    expect(response.status).toBe(404);
  });

  it("should return 500 when discount cannot be updated", async () => {
    updateDiscountMock.mockRejectedValue(new Error("Error updating Discount"));
    const discountId = 1;
    const response = await request(app)
      .put(`/api/admin/discount/${discountId}`)
      .set("authorization", `Bearer ${token}`)
      .send({
        coupon: "invalidcoupon",
        discount_type: DiscountType.FLAT,
        discount_rate: "invalidrate",
        status: true,
        startDate: "invalidstartDate",
        endDate: "invalidendDate",
      });
    expect(response.status).toBe(500);
  });
});

describe("Apply Discount", () => {
  it("Should apply discount to product", async () => {
    addproductDiscountMock.mockResolvedValue({
      product: Products,
      discount: Discount,
      applyDate: "validapplyDate",
      endDate: "validendDate",
    });
    getProductByIdMock.mockResolvedValue([
      { productId: 1, productName: "Product1", price: 10, quantity: 5 },
    ]);

    getDiscByIdMock.mockResolvedValue([
      {
        discountId: 1,
        coupon: "Coupon1",
        discountType: "flat",
        discountRate: 50,
      },
    ]);

    const discountId = 1;
    const productId = 1;

    const response = await request(app)
      .post(`/api/admin/product/${productId}/discount/${discountId}`)
      .set("authorization", `Bearer ${token}`)
      .send({
        applyDate: "validapplyDate",
        endDate: "validendDate",
      });
    expect(response.status).toBe(200);
  });

  it("Should return 404 when discount or product NOT found", async () => {
    addproductDiscountMock.mockResolvedValue([]);
    getProductByIdMock.mockResolvedValue(null);
    getDiscByIdMock.mockResolvedValue(null);

    const discountId = 1;
    const productId = 1;

    const response = await request(app)
      .post(`/api/admin/product/${productId}/discount/${discountId}`)
      .set("authorization", `Bearer ${token}`)
      .send({
        applyDate: "validapplyDate",
        endDate: "validendDate",
      });

    expect(response.status).toBe(404);
  });
});
