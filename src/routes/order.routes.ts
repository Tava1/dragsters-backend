import Router from 'express';

import orderController from '../controller/OrderController';

const orderRouter = Router();

orderRouter.get('/', orderController.readAll);

orderRouter.get('/detail/:orderID', orderController.detail);

orderRouter.get('/:customerID', orderController.read);

orderRouter.post('/', orderController.create);

export default orderRouter;
