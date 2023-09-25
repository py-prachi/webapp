// jwt.service.ts
const jwt = require('jsonwebtoken');
require('dotenv').config(); // Load environment variables from .env file

console.log("************* In JWT Services *************")
const secretKey = process.env.SECRET_KEY;
  
export const generateToken = (sub:string) => {
    const token = jwt.sign( {sub } ,secretKey);
    return token;
}
