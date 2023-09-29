import { AppDataSource } from "../data-source"
import { Request, Response } from "express"
import { User } from "../entity/User"
import { generateToken } from '../jwt-service';
import { authenticateUser } from "../service/authenticateUser";

export const userLogin = async (req: Request, res: Response) => {

    console.log('In Login User Route', req.body)  
  
    const { userName,password } = req.body;
    console.log(userName,password);

    // Validate input data (e.g., username and password constraints)
    if (!userName || !password) {
        return res.status(400).json({ message: 'Username and password are required.' });
    }
        try {
          const user = await authenticateUser(userName,password);
          
          if (!user) {
            console.error("Authentication failed for user:", userName);
            return res.status(401).json({ message: "Invalid credentials" });
          }
          const token = generateToken(user.email, user.role)
              res.json({token:token});
          
        } catch(error){
            console.error("Error authenticating user:", error);

            res.status(500).json({ message: "Server error" });
        }
    };
    
