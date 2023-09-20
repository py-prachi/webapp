import express from 'express';


const app = express();

 

app.use(express.json());

var { expressjwt: jwt } = require("express-jwt");
var jwt = require('jsonwebtoken');

// or ES6
//import { expressjwt, ExpressJwtRequest } from "express-jwt";

// app.get(
//   "/protected",
//   jwt({ secret: "shhhhhhared-secret", algorithms: ["HS256"] }),
//   function (req: { auth: { admin: any; }; }, res: { sendStatus: (arg0: number) => void; }) {
//     if (!req.auth.admin) return res.sendStatus(401);
//     res.sendStatus(200);
//   }
// );


app.get('/', (req: any,res: { send: (arg0: string) => void; }) =>{
    res.send('Hello World!!!!! ');
});


app.post('/api/webapp/login',(req,res)=>
{

    const user = {
      user_name: 'test@test.com',
      password: 'password'
    };
    const token = jwt.sign({ user }, 'my-secret-key');
    res.json({
      token:token
    });
});

const port = process.env.PORT || 8080
app.listen(port,() => console.log(`Listening on port ${port}..`));

