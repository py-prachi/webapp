import request from "supertest";

import app from "../src/app";
import { AppDataSource } from "../src/data-source";
import { addToCart } from "../src/controller/cartController";
import { getUserByEmail } from "../src/service/userService";
import { getById } from "../src/service/productService";
import { User } from "../src/entity/User";
import { Products } from "../src/entity/Products";
import { createCartEntry } from "../src/service/cartService";

jest.mock("../src/service/productService");
const getProductByIdMock = getById as jest.Mock;

jest.mock("../src/service/userService");
const getUserByEmailMock = getUserByEmail as jest.Mock;

jest.mock("../src/service/cartService");
const addToCartMock = createCartEntry as jest.Mock;

jest.mock("../src/data-source");
const mockDataSource = jest.spyOn(AppDataSource, "initialize");
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0ZXN0NEB0ZXN0LmNvbSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjk3NjI2MTE4fQ.Wc29e_rvdEtkKe7ZKng6nJ0B6G4oy5KwNpdjeuZMQIE";

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

describe("Add Products to cart", () => {
  it("should return 201 when product and its qty added to cart", async () => {
    addToCartMock.mockResolvedValue({
      user: User,
      product: Products,
      quantity: 2,
    });

    getProductByIdMock.mockResolvedValue([
      { productId: 1, productName: "Product1", price: 10, quantity: 5 },
    ]);

    getUserByEmailMock.mockResolvedValue([
      { id: 4, email: "test4@test4.com", password: "password4", role: "user" },
    ]);

    const response = await request(app)
      .post("/api/webapp/products/addToCart")
      .set("authorization", `Bearer ${token}`)
      .send({
        productId: "1",
        quantity: "2",
      });

    expect(response.status).toBe(201);
  });

  it("should return 500 when product cannot be added", async () => {
    addToCartMock.mockRejectedValue(new Error("Error adding Product to Cart"));

    getProductByIdMock.mockResolvedValue([
      { productId: 1, productName: "Product1", price: 10, quantity: 5 },
    ]);
    getUserByEmailMock.mockResolvedValue([
      { id: 4, email: "test4@test4.com", password: "password4", role: "user" },
    ]);

    const response = await request(app)
      .post("/api/webapp/products/addToCart")
      .set("authorization", `Bearer ${token}`)
      .send({
        productId: "invalidID",
        quantity: "invalidquantity",
      });
    expect(response.status).toBe(500);
  });

  it("should return 404 when User not logged in", async () => {
    addToCartMock.mockResolvedValue([]);

    getProductByIdMock.mockResolvedValue([
      { productId: 1, productName: "Product1", price: 10, quantity: 5 },
    ]);

    getUserByEmailMock.mockResolvedValue(null);

    const response = await request(app)
      .post("/api/webapp/products/addToCart")
      .set("authorization", `Bearer ${token}`)
      .send({
        productId: "1",
        quantity: "2",
      });

    expect(response.status).toBe(404);
  });

  it("should return 404 when product not found", async () => {
    addToCartMock.mockResolvedValue([]);

    getProductByIdMock.mockResolvedValue(null);

    getUserByEmailMock.mockResolvedValue([]);

    const response = await request(app)
      .post("/api/webapp/products/addToCart")
      .set("authorization", `Bearer ${token}`)
      .send({
        productId: "101",
        quantity: "2",
      });

    expect(response.status).toBe(404);
  });
});
