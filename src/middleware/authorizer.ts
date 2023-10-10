const jwt = require('jsonwebtoken');
require ('dotenv').config();
import { NextFunction, Request, Response } from 'express';


export const authUser = async (req: Request, res: Response, next: NextFunction): Promise<void> =>{
    
    const header = req.headers['authorization'];
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
        return next (res.status(401).json({ message: "Unauthorized" }));
    }
    
    const bearer = header!.split(' ');
    const bearerToken = bearer[1];
    const expectedToken = atob(bearerToken.split(".")[1]);
    const userrole = JSON.parse(expectedToken).role;
    
    
    if (userrole !== 'admin') {
        return next(res.status(403).json({ message: "Forbidden" }));
    }
    next();
                
};


