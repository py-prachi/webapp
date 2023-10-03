const jwt = require('jsonwebtoken');
require ('dotenv').config();
const { NextFunction } = require('express');


function checkToken (req: { headers: { [x: string]: any; authorization: string; }; token: any; },res: { sendStatus: (arg0: number) => any; },next: () => void){
    const header = req.headers['authorization'];
    
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
     return res.sendStatus(401); // Unauthorized
    }
    
    const bearer = header.split(' ');
    const bearerToken = bearer[1];
    const expectedToken = atob(bearerToken.split(".")[1]);
    const userrole = JSON.parse(expectedToken).role;
    req.token = userrole;
    
    if (userrole !== 'admin') {
        return res.sendStatus(403); // Forbidden (insufficient role)
    }
    next();
                
};

module.exports = checkToken;
