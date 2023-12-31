import request from "supertest";

import app from "../src/app";
import { AppDataSource } from "../src/data-source";
import { User } from "../src/entity/User";
import { DiscountType } from "../src/entity/discount";

const jwt = require("jsonwebtoken");

require("dotenv").config;

describe("App routes", () => {
  beforeAll(async () => {
    await AppDataSource.initialize();
  });

  afterAll(async () => {
    await AppDataSource.destroy();
  });
  it("should login", async () => {
    // given
    const email = "test1";
    const existingUser = new User();
    existingUser.email = email;
    existingUser.password = "test1234";
    existingUser.role = "user";
    await existingUser.save();

    // when
    const response = await request(app)
      .post("/api/webapp/login")
      .send({ userName: "test1", password: "test1234" });

    // then
    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
  });

  it("Unauthorized to access the path when not logged in or no token sent ", async () => {
    const response = await request(app)
      .post("/api/admin/product")
      .send({ productName: "prod1", price: 10, quantity: 5 });

    expect(response.status).toBe(401);
  });

  it("Logged in as Admin, can add product successfully", async () => {
    const email = "test2";
    const existingUser = new User();
    existingUser.email = email;
    existingUser.password = "test1234";
    existingUser.role = "admin";
    await existingUser.save();

    const token = jwt.sign(
      {
        userName: existingUser.email,
        role: existingUser.role,
      },
      process.env.SECRET_KEY
    );

    const response = await request(app)
      .post("/api/admin/product")
      .set("authorization", `Bearer ${token}`)
      .send({
        productName: "prod2",
        price: 10,
        quantity: 5,
        category: "category1",
        description: "",
      });

    expect(response.status).toBe(201);
  });

  it("Logged in as User, FORBIDDEN to add product", async () => {
    const email = "test3";
    const existingUser = new User();
    existingUser.email = email;
    existingUser.password = "test1234";
    existingUser.role = "user";
    await existingUser.save();

    const token = jwt.sign(
      {
        userName: existingUser.email,
        role: existingUser.role,
      },
      process.env.SECRET_KEY
    );

    const response = await request(app)
      .post("/api/admin/product")
      .set("authorization", `Bearer ${token}`)
      .send({
        productName: "prod3",
        price: 10,
        quantity: 5,
        category: "category1",
        description: "",
      });

    expect(response.status).toBe(403);
  });

  it("Logged in as Admin, can get all products", async () => {
    const token = jwt.sign(
      {
        userName: "test2",
        role: "admin",
      },
      process.env.SECRET_KEY
    );

    const response = await request(app)
      .get("/api/admin/product")
      .set("authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
  });
  it("Logged in as Admin, can get product by id", async () => {
    const token = jwt.sign(
      {
        userName: "test2",
        role: "admin",
      },
      process.env.SECRET_KEY
    );
    const productId = 1;

    const response = await request(app)
      .get(`/api/admin/product/${productId}`)
      .set("authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
  });
  it("Logged in as Admin, can update specific product", async () => {
    const token = jwt.sign(
      {
        userName: "test2",
        role: "admin",
      },
      process.env.SECRET_KEY
    );
    const productId = 1;

    const response = await request(app)
      .put(`/api/admin/product/${productId}`)
      .set("authorization", `Bearer ${token}`)
      .send({ productName: "updated-product", price: 100, quantity: 50 });

    expect(response.status).toBe(204);
  });

  it("Logged in as Admin, can delete specific product", async () => {
    const token = jwt.sign(
      {
        userName: "test2",
        role: "admin",
      },
      process.env.SECRET_KEY
    );
    const productId = 1;

    const response = await request(app)
      .delete(`/api/admin/product/${productId}`)
      .set("authorization", `Bearer ${token}`);

    expect(response.status).toBe(204);
  });

  it("Logged in as Admin, can add discount successfully", async () => {
    const token = jwt.sign(
      {
        userName: "test2",
        role: "admin",
      },
      process.env.SECRET_KEY
    );

    const response = await request(app)
      .post("/api/admin/discount")
      .set("authorization", `Bearer ${token}`)
      .send({
        coupon: "Coupon1",
        discount_type: DiscountType.FLAT,
        discount_rate: 10,
        status: true,
        startDate: new Date("2023-10-09"),
        endDate: new Date("2023-10-19"),
      });

    expect(response.status).toBe(201);
  });

  it("Logged in as Admin, can get all discounts", async () => {
    const token = jwt.sign(
      {
        userName: "test2",
        role: "admin",
      },
      process.env.SECRET_KEY
    );

    const response = await request(app)
      .get("/api/admin/discount")
      .set("authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
  });

  it("Logged in as Admin, can update specific discount", async () => {
    const token = jwt.sign(
      {
        userName: "test2",
        role: "admin",
      },
      process.env.SECRET_KEY
    );
    const discountId = 1;

    const response = await request(app)
      .put(`/api/admin/discount/${discountId}`)
      .set("authorization", `Bearer ${token}`)
      .send({
        coupon: "UpdateCoupon",
        discount_type: DiscountType.FLAT,
        discount_rate: 10,
        status: true,
        startDate: new Date("2023-10-09"),
        endDate: new Date("2023-10-19"),
      });

    expect(response.status).toBe(200);
  });

  it("Logged in as Admin, can apply discount to a product successfully", async () => {
    const token = jwt.sign(
      {
        userName: "test2",
        role: "admin",
      },
      process.env.SECRET_KEY
    );

    await request(app)
      .post("/api/admin/product")
      .set("authorization", `Bearer ${token}`)
      .send({
        productName: "prod2",
        price: 10,
        quantity: 5,
        category: "category1",
        description: "",
      });

    const productId = 2;
    const discountId = 1;

    const response = await request(app)
      .post(`/api/admin/product/${productId}/discount/${discountId}`)
      .set("authorization", `Bearer ${token}`)
      .send({
        apply_date: new Date("2023-10-09"),
        end_date: new Date("2023-10-19"),
      });

    expect(response.status).toBe(200);
  });

  it("should return products based on search criteria", async () => {
    //given
    const token = jwt.sign(
      {
        userName: "test2",
        role: "admin",
      },
      process.env.SECRET_KEY
    );

    await request(app)
      .post("/api/admin/product")
      .set("authorization", `Bearer ${token}`)
      .send({
        productName: "Dell Laptop",
        price: 50000,
        quantity: 5,
        category: "Electronics",
        description: "high-performance",
      });

    await request(app)
      .post("/api/admin/product")
      .set("authorization", `Bearer ${token}`)
      .send({
        productName: " Iphone",
        price: 100000,
        quantity: 5,
        category: "Electronics",
        description: "long battery life",
      });

    //when
    const response = await request(app)
      .get("/api/webapp/product/search")
      .query({ productName: "dell", category: "electronic" })
      .send();

    //then
    expect(response.status).toBe(200);
  });

  it("Logged in as customer, can add products to the cart successfully", async () => {
    const token = jwt.sign(
      {
        userName: "test3",
        role: "user",
      },
      process.env.SECRET_KEY
    );

    const response = await request(app)
      .post(`/api/webapp/products/addToCart`)
      .set("authorization", `Bearer ${token}`)
      .send({
        productId: 4,
        quantity: 2,
      });

    expect(response.status).toBe(201);
  });

  it("Logged in as customer, can checkout from cart sucessfully", async () => {
    const token = jwt.sign(
      {
        userName: "test3",
        role: "user",
      },
      process.env.SECRET_KEY
    );

    const response = await request(app)
      .post(`/api/webapp/checkout`)
      .set("authorization", `Bearer ${token}`)
      .send({
        shippingAddress: "ABC",
        contactNumber: 1245676511,
        cardNumber: 1526352436351711,
      });

    expect(response.status).toBe(201);
  });

  it("Logged in as customer, can view order history", async () => {
    const token = jwt.sign(
      {
        userName: "test3",
        role: "user",
      },
      process.env.SECRET_KEY
    );

    const response = await request(app)
      .get(`/api/webapp/orderHistory`)
      .set("authorization", `Bearer ${token}`);
     

    expect(response.status).toBe(200);
  });
});
