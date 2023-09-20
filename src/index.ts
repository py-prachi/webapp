import express from 'express';
require('dotenv').config(); // Load environment variables from .env file

const secretKey = process.env.SECRET_KEY;



const app = express();

 
app.use(express.json());

var { expressjwt: jwt } = require("express-jwt");
var jwt = require('jsonwebtoken');

app.post('/api/webapp/login',(req,res)=>
{
    const { user_name,password } = req.body
    const token = jwt.sign({ user_name }, secretKey);
    res.json({
      token:token
    });
    
});

const port = process.env.PORT || 8080
app.listen(port,() => console.log(`Listening on port ${port}..`));

export default app;

