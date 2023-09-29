import request from "supertest";
import { response } from "express";
import app from "../src/index";
//import { httpserver } from "../src/index";
import { AppDataSource } from "../src/data-source";
import { User } from "../src/entity/User";


//let server:any;



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
    existingUser.role = "user"
    await existingUser.save();

    // when
    const response = await request(app)
      .post("/api/webapp/login")
      .send({ userName: "test1", password: "test1234" });

    // then
    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
  });
});
