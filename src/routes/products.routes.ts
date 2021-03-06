import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import multer from 'multer';
import uploadConfig from '../config/upload';
import productController from '../controller/ProductController';

const productsRouter = Router();
const upload = multer(uploadConfig);

productsRouter.get('/', productController.read);

productsRouter.get('/:id', productController.detail);

productsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      product_name: Joi.string().required().min(3).max(280),
      product_fullname: Joi.string().required().min(3).max(2000),
      brand: Joi.string().required().min(3).max(20),
      description: Joi.string().required().min(3).max(2000),
      stars: Joi.number(),
      status: Joi.boolean().required(),
      supply: Joi.number().required().integer(),
      price: Joi.number().precision(2).required(),
    }),
  }),
  productController.create,
);

productsRouter.post(
  '/images/:id',
  upload.array('showcase'),
  productController.createImages,
);

productsRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      product_name: Joi.string().required().min(3).max(280),
      product_fullname: Joi.string().required().min(3).max(2000),
      brand: Joi.string().required().min(3).max(20),
      description: Joi.string().required().min(3).max(2000),
      stars: Joi.number(),
      status: Joi.boolean().required(),
      supply: Joi.number().required().integer(),
      price: Joi.number().precision(2).required(),
    }),
  }),
  productController.update,
);

productsRouter.patch('/:id/:setStatus/', productController.updateStatus);

export default productsRouter;
