import { Router } from 'express';
import userController from '../controller/UserController';

const usersRouter = Router();

// http://localhost:3333/users?offset=0&limit=10
usersRouter.get('/', userController.read);

usersRouter.get('/:id', userController.detail);

usersRouter.post('/', userController.create);

usersRouter.put('/:id', userController.update);

usersRouter.patch('/:id/:setStatus/', userController.updateStatus);

export default usersRouter;
