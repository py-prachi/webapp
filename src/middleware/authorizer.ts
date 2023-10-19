const jwt = require("jsonwebtoken");
require("dotenv").config();
import { NextFunction, Request, Response } from "express";

export const authAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  
  console.log(" In auth admin middleware!");
  const header = req.headers["authorization"];
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return next(res.status(401).json({ message: "Unauthorized" }));
  }

  const bearer = header!.split(" ");
  const bearerToken = bearer[1];
  const expectedToken = atob(bearerToken.split(".")[1]);
  const userrole = JSON.parse(expectedToken).role;

  if (userrole !== "admin") {
    return next(res.status(403).json({ message: "Forbidden" }));
  }
  next();
};

export const authUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
    
  console.log(" In auth user middleware!");
  const header = req.headers["authorization"];
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return next(res.status(401).json({ message: "Unauthorized" }));
  }

  const bearer = header!.split(" ");
  const bearerToken = bearer[1];
  const expectedToken = atob(bearerToken.split(".")[1]);
  const userName = JSON.parse(expectedToken).sub;
  res.locals.userName = userName;
  
  console.log("passed the auth test:", userName);
  next();
};
