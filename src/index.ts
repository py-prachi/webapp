import express from 'express';
import "reflect-metadata";
import { AppDataSource } from "./data-source";

import { userLogin, registerUser } from './controller/userController';
import { addProduct, getProducts, getProductById, updateProduct, deleteProduct } from './controller/productController';

import {authUser} from  './middleware/authorizer';
import { addDiscount, getDiscount, productDiscount } from './controller/discountController';

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
app.post('/api/admin/product', authUser, addProduct);

//route to get all Products from the catalog
app.get('/api/admin/product', authUser, getProducts);

//route to get product by id from the catalog
app.get('/api/admin/product/:id', authUser, getProductById);

//route to update a product from the catalog
app.put('/api/admin/product/:id', authUser, updateProduct);

//route to delete a product from the catalog
app.delete('/api/admin/product/:id', authUser, deleteProduct);


app.post('/api/admin/discount', authUser, addDiscount);

app.get('/api/admin/discount', authUser, getDiscount);

app.post('/api/admin/product/:productId/discount/:discountId', authUser, productDiscount );


const port = process.env.PORT || 8080
let httpserver:any;


httpserver = app.listen(port,() => {
  console.log(`Server started on port ${port}..`);
});

export default app;
//export {app, httpserver};


