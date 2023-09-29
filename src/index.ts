import express from 'express';
import "reflect-metadata";
import { AppDataSource } from "./data-source";
import { registerUser } from './controller/registrationController';
import { userLogin } from './controller/userController';
import { addProduct } from './controller/productController';

require('dotenv').config(); // Load environment variables from .env file

const app = express();
app.use(express.urlencoded({extended: true}));
 
app.use(express.json());


(async () => {
  try{
    await AppDataSource.initialize();
    console.log('Created DB connection');
  } catch (error) {
    console.error(error);
    throw new Error("Unable to connect to DB")
  }
  
})();


//route to login a User
app.post('/api/webapp/login',userLogin);


//route to register a New User
app.post('/api/webapp/register',registerUser);


//route to add a Product to catalog
app.post('/api/webapp/product/add', addProduct);

const port = process.env.PORT || 8080
let httpserver:any;


httpserver = app.listen(port,() => {
  console.log(`Server started on port ${port}..`);
});

export default app;
//export {app, httpserver};


