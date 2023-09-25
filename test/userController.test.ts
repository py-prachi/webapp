import request from "supertest";
import { response } from "express";
import { authenticateUser } from "../src/service/userData";
import app from "../src/index";
import { AppDataSource } from "../src/data-source";

jest.mock("../src/service/userData");
const authenticateUserMock = authenticateUser as jest.Mock;

jest.mock("../src/data-source");
const mockDataSource = AppDataSource.initialize as jest.Mock;

describe("Authentication", () => {
  it("should return 400 when no username or password", async () => {
    const response = await request(app)
      .post("/api/webapp/login")
      .send({ userName: "", password: "" });
    expect(response.status).toBe(400);
  });

  it("should return 401 when invalid credentials", async () => {
    authenticateUserMock.mockResolvedValue(undefined);
    const response = await request(app)
      .post("/api/webapp/login")
      .send({ userName: "test1@test.com", password: "invalidpassword" });
    expect(response.status).toBe(401);
  });
});
