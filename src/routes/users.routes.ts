import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import userController from '../controller/UserController';

const usersRouter = Router();

// http://localhost:3333/users?offset=0&limit=10
usersRouter.get('/', userController.read);

usersRouter.get('/:id', userController.detail);

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      fullname: Joi.string().min(5).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(3).required(),
      role: Joi.string().required(),
    }),
  }),
  userController.create,
);

usersRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      fullname: Joi.string().min(5).required(),
      password: Joi.string().min(3).required(),
      role: Joi.string().required(),
      status: Joi.boolean(),
    }),
  }),
  userController.update,
);

usersRouter.patch('/:id/:setStatus/', userController.updateStatus);

export default usersRouter;
