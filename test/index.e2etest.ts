import request from "supertest";
import { response } from "express";
import app from "../src/index";
import { AppDataSource } from "../src/data-source";
import { User } from "../src/entity/User";
//import { userLogin } from "../src/controller/userController";
//import { addProduct } from "../src/controller/productController";
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
 
    const response = await request(app)
      .post('/api/admin/product')
      .send({ productName: "prod1", price:10, quantity: 5});
    
    expect(response.status).toBe(401);
  });

  it("Logged in as Admin, can add product successfully", async () => {
    
  
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
      .post('/api/admin/product')
      .set('authorization', `Bearer ${token}`) 
      .send({ productName: "prod2", price:10, quantity: 5});
    
    
    expect(response.status).toBe(201); 
  });

  it("Logged in as User, FORBIDDEN to add product", async () => {
    
  
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
      .post('/api/admin/product')
      .set('authorization', `Bearer ${token}`) 
      .send({ productName: "prod3", price:10, quantity: 5});
    
    
    expect(response.status).toBe(403);
    });

    it("Logged in as Admin, can get all products", async () => {
    
    
      const token = jwt.sign({ 
        userName: "test2", 
        role: "admin" }, 
        process.env.SECRET_KEY);
    
      const response = await request(app)
        .get('/api/admin/product')
        .set('authorization', `Bearer ${token}`);
      
      expect(response.status).toBe(200);
      
    });
    it("Logged in as Admin, can get product by id", async () => {
      
    
      const token = jwt.sign({ 
        userName: "test2", 
        role: "admin" }, 
        process.env.SECRET_KEY);
      const productId = 1;
    
      const response = await request(app)
        .get(`/api/admin/product/${productId}`)
        .set('authorization', `Bearer ${token}`);
      
      expect(response.status).toBe(200);
      
    });
    it("Logged in as Admin, can update specific product", async () => {
      
    
      const token = jwt.sign({ 
        userName: "test2", 
        role: "admin" }, 
        process.env.SECRET_KEY);
      const productId = 1;
       
      const response = await request(app)
        .put(`/api/admin/product/${productId}`)
        .set('authorization', `Bearer ${token}`)
        .send({ productName: "updated-product", price:100, quantity: 50});
      
      expect(response.status).toBe(204);
      
    });

    it("Logged in as Admin, can delete specific product", async () => {
      
    
      const token = jwt.sign({ 
        userName: "test2", 
        role: "admin" }, 
        process.env.SECRET_KEY);
      const productId = 1;
       
      const response = await request(app)
        .delete(`/api/admin/product/${productId}`)
        .set('authorization', `Bearer ${token}`);
        
      
      expect(response.status).toBe(204);
      
    });
});
