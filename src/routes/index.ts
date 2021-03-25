import { Router } from 'express';

import productsRouter from './products.routes';
import showcaseRouter from './showcase.routes';

const routes = Router();

routes.use('/products', productsRouter);
routes.use('/showcase', showcaseRouter);

export default routes;
