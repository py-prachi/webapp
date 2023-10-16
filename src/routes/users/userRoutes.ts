import express  from 'express';

import { registerUser, userLogin } from '../../controller/userController';
import { searchProduct } from '../../controller/productController';

const userRouter = express.Router();


userRouter.post('/login',userLogin);

userRouter.post('/register',registerUser);

userRouter.get('/product/search',searchProduct);


export default userRouter;