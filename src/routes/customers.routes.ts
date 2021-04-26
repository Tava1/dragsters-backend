import Router from 'express';

import customerController from '../controller/CustomerController';

const customersRouter = Router();

customersRouter.get('/', customerController.read);

customersRouter.post('/', customerController.create);

customersRouter.get('/:id', customerController.detail);

customersRouter.put('/:id', customerController.update);

customersRouter.patch(
  '/password-recovery/:id',
  customerController.passwordRecovery,
);

export default customersRouter;
