import express from 'express';

import { addDiscount, getDiscount,  addProductDiscount,  updateDiscount } from '../../controller/discountController';
import { addProduct, deleteProduct, getProductById, getProducts, updateProduct } from '../../controller/productController';
import { authUser } from '../../middleware/authorizer';

const adminRouter = express.Router();

adminRouter.post('/product', authUser, addProduct);

adminRouter.get('/product', authUser, getProducts);

adminRouter.get('/product/:id', authUser, getProductById);

adminRouter.put('/product/:id', authUser, updateProduct);

adminRouter.delete('/product/:id', authUser, deleteProduct);

adminRouter.post('/discount', authUser, addDiscount);

adminRouter.get('/discount', authUser, getDiscount);

adminRouter.put('/discount/:id', authUser, updateDiscount);

adminRouter.post('/product/:productId/discount/:discountId', authUser, addProductDiscount );


export default adminRouter;