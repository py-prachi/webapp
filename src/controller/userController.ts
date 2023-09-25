import { AppDataSource } from "../data-source"

import { NextFunction, Request, Response } from "express"
import { User } from "../entity/User"
import JwtService from '../jwt-service';
require('dotenv').config(); // Load environment variables from .env file

const secretKey = process.env.SECRET_KEY;

export const userLogin = async (req: Request, res: Response) => {

    console.log('In Login User Route', req.body)  
  
    const { userName,password } = req.body;
    console.log(userName,password);

    // Validate input data (e.g., username and password constraints)
    if (!userName || !password) {
        return res.status(400).json({ message: 'Username and password are required.' });
    }
        try {
          const userRepository = AppDataSource.getRepository(User);
          const user = await userRepository.findOne({ where: { email : userName } });
          console.log(user?.email, user?.password, user?.id)
          if (!user || user.password !== password) {
            return res.status(401).json({ message: "Invalid credentials" });
          }
    
          const Jwtservice = new JwtService(secretKey!);
          const token = Jwtservice.generateToken(userName)
          res.json({token:token});
          console.log(token);
        } catch(error){
            console.error("Error authenticating user:", error);
            res.status(500).json({ message: "Server error" });
        }
    };
    
//export {UserController};