import express from 'express';


const app = express();

 
app.use(express.json());

var { expressjwt: jwt } = require("express-jwt");
var jwt = require('jsonwebtoken');

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

