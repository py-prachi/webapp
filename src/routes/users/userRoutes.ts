import express  from 'express';

import { registerUser, userLogin } from '../../controller/userController';

const userRouter = express.Router();


userRouter.post('/login',userLogin);

userRouter.post('/register',registerUser);


export default userRouter;