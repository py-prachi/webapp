import request from "supertest";

import app from "../src/app";
import { AppDataSource } from "../src/data-source";
import {
  createOrder,
  createProductOrder,
  getOrders,
  updateOrder,
} from "../src/service/orderService";
import { getUserByEmail } from "../src/service/userService";
import { delCart, getCart } from "../src/service/cartService";

jest.mock("../src/service/cartService");
const getCartMock = getCart as jest.Mock;

jest.mock("../src/service/orderService");
const getOrdersMock = getOrders as jest.Mock;

jest.mock("../src/service/cartService");
const delCartMock = delCart as jest.Mock;

jest.mock("../src/service/orderService");
const updateOrderMock = updateOrder as jest.Mock;

jest.mock("../src/service/orderService");
const createProductOrderMock = createProductOrder as jest.Mock;

jest.mock("../src/service/orderService");
const createOrderMock = createOrder as jest.Mock;

jest.mock("../src/service/userService");
const getUserByEmailMock = getUserByEmail as jest.Mock;

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

describe("Checkout Cart", () => {
  it("should return 201 when order created", async () => {
    createOrderMock.mockResolvedValue([
      {
        orderId: 1,
        userId: 4,
        shippingAddress: "XYZ",
        contactNumber: 8798798793,
        cardNumber: 2345234523452345,
        orderDate: "2023-10-26",
        totalAmount: 0,
        status: "pending",
      },
    ]);
    getUserByEmailMock.mockResolvedValue([
      { id: 4, email: "test4@test4.com", password: "password4", role: "user" },
    ]);

    getCartMock.mockResolvedValue([
      {
        cart_id: 1,
        product_id: 1,
        quantity: 1,
        discountApplied: "100.00",
        subtotal: "1000.00",
        total: "900.00",
        status: "Open",
      },
      {
        cart_id: 2,
        product_id: 2,
        quantity: 1,
        discountApplied: "0.00",
        subtotal: "2000.00",
        total: "2000.00",
        status: "Open",
      },
    ]);

    updateOrderMock.mockResolvedValue(
      {
        orderId: 1,
        userId: 4,
        shippingAddress: "XYZ",
        contactNumber: 8798798793,
        cardNumber: 2345234523452345,
        orderDate: "2023-10-26",
        totalAmount: 2900,
        status: "completed",
      },
    );

    delCartMock.mockResolvedValue([
      {
        cart_id: 1,
        product_id: 1,
        quantity: 1,
        discountApplied: "100.00",
        subtotal: "1000.00",
        total: "900.00",
        status: "Open",
      },
      {
        cart_id: 2,
        product_id: 2,
        quantity: 1,
        discountApplied: "0.00",
        subtotal: "2000.00",
        total: "2000.00",
        status: "Open",
      },
    ]);
    createProductOrderMock.mockResolvedValue([
      {
        orderId: 1,
        product_id: 1,
        quantity: 1,
        discountApplied: "100.00",
        subtotal: "1000.00",
        total: "900.00",
        order_status:"completed"
      }
    ]);
    const response = await request(app)
      .post("/api/webapp/checkout")
      .set("authorization", `Bearer ${token}`)
      .send({
        shippingAddress: "XYZ",
        contactNumber: 8798798793,
        cardNumber: 2345234523452345,
      });

    expect(response.status).toBe(201);
  });
});

describe("Order History", () => {
  it("should return 200 and display all the products from catalog", async () => {
    getUserByEmailMock.mockResolvedValue([
      { id: 4, email: "test4@test4.com", password: "password4", role: "user" },
    ]);

    getOrdersMock.mockResolvedValue([
      { order_id: 1, user_id : 4, shipping_address:"XYZ", total_price: 2900, order_date:"2023-10-09" },
      { order_id: 2, user_id : 4, shipping_address:"XYZ", total_price: 1000, order_date:"2023-10-19" },
    ]);
    const response = await request(app)
      .get("/api/webapp/orderHistory")
      .set("authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
  });
});
