import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import showcaseController from '../controller/ShowcaseController';

const showcaseRouter = Router();

showcaseRouter.get('/', showcaseController.read);

showcaseRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      product_id: Joi.string().required(),
      filenames: Joi.array().required(),
      path: Joi.string().required(),
      thumbnail: Joi.boolean().required(),
    }),
  }),
  showcaseController.create,
);

export default showcaseRouter;
