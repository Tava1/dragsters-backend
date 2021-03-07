import { Router } from 'express';
import multer from 'multer';
import { getRepository } from 'typeorm';
import uploadConfig from '../config/upload';

import Product from '../models/Product';

import CreateProductService from '../services/CreateProductService';

const productsRouter = Router();
const upload = multer(uploadConfig);

interface RequestFiles {
  filename: string;
  path: string;
}

// TODO: Listar todos os produtos
productsRouter.get('/', async (request, response) => {
  const productsRepository = getRepository(Product);

  const products = await productsRepository.find();

  return response.json(products);
});

// TODO: Criar produto com imagem
productsRouter.post(
  '/',
  upload.array('showcase'),
  async (request, response) => {
    const {
      product_name,
      product_fullname,
      stars,
      status,
      supply,
      price,
    } = request.body;

    const { files } = request;

    const showcase: Array<RequestFiles> = [];

    function getFiles(myFiles: any) {
      myFiles.map((file: any) => {
        return showcase.push({
          filename: file.filename,
          path: file.destination,
        });
      });
    }

    getFiles(files);

    const createProduct = new CreateProductService();

    try {
      const product = await createProduct.execute({
        product_name,
        product_fullname,
        stars,
        status,
        supply,
        price,
        showcase,
      });

      return response.json(product);
    } catch (error) {
      return response.json(error);
    }
  },
);

export default productsRouter;
