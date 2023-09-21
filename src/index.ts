import express from 'express';
import "reflect-metadata";
import { AppDataSource } from "./data-source";
//import User from "./entity/User";

require('dotenv').config(); // Load environment variables from .env file

const secretKey = process.env.SECRET_KEY;

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


var { expressjwt: jwt } = require("express-jwt");
var jwt = require('jsonwebtoken');

app.post('/api/webapp/login',(req,res)=>
{
    const { userName,password } = req.body
    console.debug(userName, password)
    const token = jwt.sign({ sub: userName }, secretKey);
    res.json({
      token:token
    });
    

});

const port = process.env.PORT || 8080
app.listen(port,() => console.log(`Listening on port ${port}..`));

export default app;

