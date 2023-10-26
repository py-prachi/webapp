import request from "supertest";
import { response } from "express";
import { authenticateUser } from "../src/service/userService";
import app from "../src/app";
import { AppDataSource } from "../src/data-source";
import { generateToken } from "../src/jwt-service";

jest.mock("../src/service/userService");
const authenticateUserMock = authenticateUser as jest.Mock;

jest.mock("../src/data-source");
const mockDataSource = jest.spyOn(AppDataSource, "initialize");

beforeAll(async () => {});

afterAll(async () => {
  mockDataSource.mockRestore();
  jest.clearAllMocks();
});

jest.mock("../src/jwt-service");
const mockGenToken = generateToken as jest.Mock;

describe("Authentication", () => {
  it("should return 400 when no username or password", async () => {
    jest.resetModules();
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

  it("should return 500 when user not authenticated", async () => {
    authenticateUserMock.mockRejectedValue(new Error("Authentication failed"));
    const response = await request(app)
      .post("/api/webapp/login")
      .send({ userName: "invaliduser", password: "invalidpassword" });
    expect(response.status).toBe(500);
  });

  it("should return 200 and a token when user is authenticated", async () => {
    authenticateUserMock.mockResolvedValue({
      userName: "validuser",
      password: "validpassword",
    });
    mockGenToken.mockReturnValue("mockedToken");

    const response = await request(app)
      .post("/api/webapp/login")
      .send({ userName: "validuser", password: "validpassword" });
    expect(response.status).toBe(200);
    expect(response.body.token).toBe("mockedToken");
  });
});
