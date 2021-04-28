import Router from 'express';

import billingAddressController from '../controller/BillingAddressController';

const billingAddressRouter = Router();

billingAddressRouter.get('/:customerID', billingAddressController.read);

billingAddressRouter.put('/:id', billingAddressController.update);

export default billingAddressRouter;
