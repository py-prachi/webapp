const jwt = require('jsonwebtoken');
require ('dotenv').config();
import { NextFunction, Request, Response } from 'express';


export const authAdmin = async (req: Request, res: Response, next: NextFunction): Promise<void> =>{
    
    console.log (" In auth admin middleware!");
    const header = req.headers['authorization'];
    console.log("header:", header);
    const token = req.headers.authorization?.split(' ')[1];
    console.log("token:", token);
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


export const authUser = async (req: Request, res: Response, next: NextFunction): Promise<void> =>{
    
    console.log (" In auth user middleware!");
    const header = req.headers['authorization'];
    console.log("header:", header);
    const token = req.headers.authorization?.split(' ')[1];
    
    console.log("token:", token);
    if (!token) {
        return next (res.status(401).json({ message: "Unauthorized" }));
    }
    
    const bearer = header!.split(' ');
    console.log("bearer: ", bearer)
    const bearerToken = bearer[1];
    console.log("bearerToken: ", bearerToken)
    const expectedToken = atob(bearerToken.split(".")[1]);
    console.log("expectedToken:", expectedToken);
    const userName = JSON.parse(expectedToken).sub;
    console.log("userName:", userName);
    //req.params = userName
    res.locals.userName = userName
    console.log("username: " ,res.locals.userName);
    
    next();
                
};





