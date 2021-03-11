import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import multer from 'multer';
import uploadConfig from '../config/upload';
import productController from '../controller/ProductController';

const productsRouter = Router();
const upload = multer(uploadConfig);

productsRouter.get('/', productController.read);

// TODO: Capturar os dados de um produto para a tela de detalhe
productsRouter.get('/:id', productController.detail);

productsRouter.post(
  '/',
  upload.array('showcase'),
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      product_name: Joi.string().required().min(3).max(280),
      product_fullname: Joi.string().required().min(3).max(2000),
      stars: Joi.number().required().integer(),
      status: Joi.boolean().required(),
      supply: Joi.number().required().integer(),
      price: Joi.number().precision(2).required(),
    }),
  }),
  productController.create,
);

productsRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      product_name: Joi.string().required().min(3).max(280),
      product_fullname: Joi.string().required().min(3).max(2000),
      stars: Joi.number().required().integer(),
      status: Joi.boolean().required(),
      supply: Joi.number().required().integer(),
      price: Joi.number().precision(2).required(),
    }),
  }),
  productController.update,
);

productsRouter.patch('/:id/status', productController.updateStatus);

// productsRouter.patch('/:id/images', productController.updateShowcase);

export default productsRouter;
