import Router from 'express';

import deliveryAddressController from '../controller/DeliveryAddressController';

const deliveryAddressRouter = Router();

deliveryAddressRouter.get('/:customerID', deliveryAddressController.read);

deliveryAddressRouter.post('/:customerID', deliveryAddressController.create);

deliveryAddressRouter.get('/detail/:id/', deliveryAddressController.detail);

deliveryAddressRouter.put('/:id/', deliveryAddressController.update);

deliveryAddressRouter.delete('/:id/', deliveryAddressController.delete);

export default deliveryAddressRouter;
