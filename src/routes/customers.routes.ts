import Router from 'express';

import customerController from '../controller/CustomerController';

const customersRouter = Router();

/* Customer */

customersRouter.get('/', customerController.read);

customersRouter.post('/', customerController.create);

customersRouter.get('/:id', customerController.detail);

// TODO: Update customer info by id
// customersRouter.put('/:id', customerController.update);

// TODO: Reset forgotten passworde
// customersRouter.patch(
//   'password-recovery/:id',
//   customerController.passwordRecovery,
// );

export default customersRouter;
