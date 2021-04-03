import { Router } from 'express';

import productsRouter from './products.routes';
import showcaseRouter from './showcase.routes';
import usersRouter from './users.routes';
import sessionRouter from './sessions.routes';

const routes = Router();

routes.use('/products', productsRouter);
routes.use('/showcase', showcaseRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionRouter);

export default routes;
