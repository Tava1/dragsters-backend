import Router from 'express';

import billingAddressController from '../controller/BillingAddressController';

const billingAddressRouter = Router();

// TODO: List all billing address, just addresses
// billingAddressRouter.get('/:customerID', billingAddressController.read);

// TODO: Detail billing address by id
// billingAddressRouter.get('/:id/:customerID', billingAddressController.detail);

// TODO: Update billing address by id
// billingAddressRouter.put('/:id/:customerID', billingAddressController.update);

export default billingAddressRouter;
