import express from 'express';

import { addDiscount, getDiscount,  addProductDiscount,  updateDiscount } from '../../controller/discountController';
import { addProduct, deleteProduct, getProductById, getProducts, updateProduct } from '../../controller/productController';
import { authAdmin } from '../../middleware/authorizer';

const adminRouter = express.Router();

adminRouter.post('/product', authAdmin, addProduct);

adminRouter.get('/product', authAdmin, getProducts);

adminRouter.get('/product/:id', authAdmin, getProductById);

adminRouter.put('/product/:id', authAdmin, updateProduct);

adminRouter.delete('/product/:id', authAdmin, deleteProduct);

adminRouter.post('/discount', authAdmin, addDiscount);

adminRouter.get('/discount', authAdmin, getDiscount);

adminRouter.put('/discount/:id', authAdmin, updateDiscount);

adminRouter.post('/product/:productId/discount/:discountId', authAdmin, addProductDiscount );


export default adminRouter;