import Router from 'express';

import deliveryAddressController from '../controller/DeliveryAddressController';

const deliveryAddressRouter = Router();

// TODO: List all delivery address, just adresses
deliveryAddressRouter.get('/:customerID', deliveryAddressController.read);

// TODO: Create new delivery address
deliveryAddressRouter.post('/:customerID', deliveryAddressController.create);

// TODO: Detail delivery address by id
deliveryAddressRouter.get('/:id/:customerID', deliveryAddressController.detail);

// TODO: Update delivery address by id
deliveryAddressRouter.put('/:id/', deliveryAddressController.update);

// TODO: Delete delivery address by id
deliveryAddressRouter.delete('/:id/', deliveryAddressController.delete);

export default deliveryAddressRouter;
