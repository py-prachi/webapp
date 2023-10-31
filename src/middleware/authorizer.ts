import { Request, Response, NextFunction } from "express";
import { roles, Role } from "../roles";

function verifyToken(req: Request, res: Response) {
  console.log(" verify the token..");
  const header = req.headers["authorization"];
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return null;
  }

  const bearer = header!.split(" ");
  const bearerToken = bearer[1];
  const expectedToken = atob(bearerToken.split(".")[1]);
  return JSON.parse(expectedToken);
}

export const checkPermissions = (permission: any) => {
  return (req: Request, res: Response, next: () => void) => {
    console.log("in check permission for :", permission);
    const decodedToken = verifyToken(req, res);

    if (decodedToken === null) {
      return res.status(401).json({ message: "Unauthorized" });
    } else {
      if (roles[decodedToken.role as Role].includes(permission)) {
        if (decodedToken.role === "user") {
          if (decodedToken.sub) {
            res.locals.userName = decodedToken.sub;
          }
        }
        next();
      } else {
        return res.status(403).json({ message: "Forbidden" });
      }
    }
  };
};
