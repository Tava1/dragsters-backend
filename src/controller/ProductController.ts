import { Request, Response } from 'express';
import { getRepository, createQueryBuilder } from 'typeorm';

import Product from '../models/Product';
import Showcase from '../models/Showcase';

import CreateProductService from '../services/CreateProductService';
import UpdateProductService from '../services/UpdateProductService';

interface RequestFiles {
  filename: string;
  path: string;
}

const productController = {
  async read(request: Request, response: Response): Promise<Product | any> {
    const productsRepository = getRepository(Product);

    const products = await productsRepository.find();

    return response.json(products);
  },

  async create(request: Request, response: Response): Promise<Product | any> {
    const {
      product_name,
      product_fullname,
      stars,
      status,
      supply,
      price,
    } = request.body;

    const { files } = request;

    if (!files)
      return response.json({
        Error:
          'Não foi possível cadastrar um novo produto, é necessário enviar ao menos 1 imagem.',
      });

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

      return response.status(201).json(product);
    } catch (error) {
      return response.json(error);
    }
  },

  async update(request: Request, response: Response): Promise<Product | any> {
    const { product_id } = request.params;
    const {
      product_name,
      product_fullname,
      stars,
      status,
      supply,
      price,
    } = request.body;

    const updateProductService = new UpdateProductService();

    const productUpdated = await updateProductService.execute({
      product_id,
      product_name,
      product_fullname,
      stars,
      status,
      supply,
      price,
    });

    return response.status(200).json(productUpdated);
  },

  async updateStatus(request: Request, response: Response): Promise<any> {
    const { product_id } = request.params;
    const { status } = request.body;

    const queryBuilder = createQueryBuilder(Product);

    await queryBuilder
      .update(Product)
      .set({ status })
      .where(product_id)
      .execute();

    response.json({ ok: true });
  },

  // TODO: Disparado na tela de detalhe quando atualizado as imagens.
  // async updateShowcase(request: Request, response: Response) { },

  // TODO: Visualizar o detalhe de um produto com as imagens.
  // async getSpecificProductWithImages(request: Request, response: Response) { },

  async detail(request: Request, response: Response): Promise<any> {
    const { product_id } = request.params;

    const productRepository = getRepository(Product);
    const showcaseRepository = getRepository(Showcase);

    const product = await productRepository.findOne(product_id);
    if (product) {
      const showcase = await showcaseRepository.find({
        where: {
          product_id: product.product_id,
        },
      });

      return response.json({ product, showcase });
    }

    return response.json({ ok: true });
  },
};

export default productController;
