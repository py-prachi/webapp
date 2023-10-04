import express from 'express';
import "reflect-metadata";
import { AppDataSource } from "./data-source";
//import { registerUser } from './controller/registrationController';
import { userLogin, registerUser } from './controller/userController';
import { deleteProductControl, getProductByIdControl, productAddControl, productGetControl, updateProductControl } from './controller/productController';
const  checkToken  = require ('./check-token')
//updateProductControl
require('dotenv').config(); // Load environment variables from .env file

const app = express();
app.use(express.urlencoded({extended: true}));
 
app.use(express.json());
//app.use(checkToken);


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
app.post('/api/webapp/product/add', checkToken, productAddControl);

//route to get all Products from the catalog
app.get('/api/webapp/product/get', checkToken, productGetControl);

//route to get product by id from the catalog
app.get('/api/webapp/product/get/:id', checkToken, getProductByIdControl);

//route to update a product from the catalog
app.put('/api/webapp/product/update/:id', checkToken, updateProductControl);

//route to delete a product from the catalog
app.delete('/api/webapp/product/delete/:id', checkToken, deleteProductControl);


const port = process.env.PORT || 8080
let httpserver:any;


httpserver = app.listen(port,() => {
  console.log(`Server started on port ${port}..`);
});

export default app;
//export {app, httpserver};


