// jwt.service.ts
const jwt = require('jsonwebtoken');
require('dotenv').config(); // Load environment variables from .env file


const secretKey = process.env.SECRET_KEY;
  
export const generateToken = (sub:string, role:string) => {
    const token = jwt.sign( {sub, role } ,secretKey);
    return token;
}
