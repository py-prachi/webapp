import request from "supertest";
import { response } from "express";
import app from "../src/index";
import { AppDataSource } from "../src/data-source";
import { User } from "../src/entity/User";
import { userLogin } from "../src/controller/userController";
import { productAddControl } from "../src/controller/productController";
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

  it("Unauthorized to access the path when not logged in or no token sent ", async () => {
    // when
    const response = await request(app)
      .post('/api/webapp/product/add')
      .send({ productName: "prod1", price:10, quantity: 5});
    // then
    expect(response.status).toBe(401);
  });

  it("Logged in as Admin, can add product", async () => {
    // given
  
    const email = "test2";
    const existingUser = new User();
    existingUser.email = email;
    existingUser.password = "test1234";
    existingUser.role = "admin"
    await existingUser.save();

    const token = jwt.sign({ 
      userName: existingUser.email, 
      role: existingUser.role }, 
      process.env.SECRET_KEY);
  
    const response = await request(app)
      .post('/api/webapp/product/add')
      .set('Authorization', `Bearer ${token}`) 
      .send({ productName: "prod2", price:10, quantity: 5});
    
    
    expect(response.status).toBe(201); // Product created successfully
  });

  it("Logged in as User, CANNOT add product", async () => {
    // given
  
    const email = "test3";
    const existingUser = new User();
    existingUser.email = email;
    existingUser.password = "test1234";
    existingUser.role = "user"
    await existingUser.save();

    const token = jwt.sign({ 
      userName: existingUser.email, 
      role: existingUser.role }, 
      process.env.SECRET_KEY);

    const response = await request(app)
      .post('/api/webapp/product/add')
      .set('Authorization', `Bearer ${token}`) 
      .send({ productName: "prod3", price:10, quantity: 5});
    
    
    expect(response.status).toBe(403); // Forbidden
    });
});