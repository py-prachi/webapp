import express from 'express';
import "reflect-metadata";
import { AppDataSource } from "./data-source";

require('dotenv').config(); 

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

import adminRouter from './routes/admin/adminRoutes';
app.use('/api/admin',adminRouter)

import userRouter  from './routes/users/userRoutes';
app.use('/api/webapp',userRouter)



export default app;



