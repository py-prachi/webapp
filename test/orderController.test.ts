import request from "supertest";

import app from "../src/app";
import { AppDataSource } from "../src/data-source";
import {createOrder } from "../src/service/orderService";
import { getUserByEmail } from "../src/service/userService";

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
      { orderId: 1, userId: 4, shippingAddress: "XYZ",  contactNumber: 8798798793,cardNumber: 2345234523452345,
      orderDate: "2023-10-26", totalAmount: 1000, status : "completed" },
    ]);
    getUserByEmailMock.mockResolvedValue([
        { id: 4, email: "test4@test4.com", password: "password4", role: "user" },
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
