import request from "supertest";
import { response } from "express";
import app from "../src/index";
import { userLogin } from "../src/controller/userController";
import { AppDataSource } from "../src/data-source";
import { User } from "../src/entity/User";

describe("App routes", () => {
  beforeAll(async () => {
    await AppDataSource.initialize();
  });

  afterAll(async () => {
    await AppDataSource.destroy();
  });

  it("should login", async () => {
    // given
    const email = "test";
    const existingUser = new User();
    existingUser.email = email;
    existingUser.password = "test1234";
    await existingUser.save();

    // when
    const response = await request(app)
      .post("/api/webapp/login")
      .send({ userName: "test", password: "test1234" });

    // then
    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
  });
});
