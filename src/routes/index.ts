import { Router } from 'express';

import productsRouter from './products.routes';
import showcaseRouter from './showcase.routes';
import usersRouter from './users.routes';

const routes = Router();

routes.use('/products', productsRouter);
routes.use('/showcase', showcaseRouter);
routes.use('/users', usersRouter);

export default routes;
