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
      brand,
      description,
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

    if (files) {
      getFiles(files);
    }
    // else {
    //   return response.status(400).json({
    //     Error:
    //       'Não foi possível cadastrar um novo produto, é necessário enviar ao menos 1 imagem.',
    //   });
    // }

    const createProduct = new CreateProductService();

    try {
      const product = await createProduct.execute({
        product_name,
        product_fullname,
        brand,
        description,
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

  async createImages(
    request: Request,
    response: Response,
  ): Promise<Product | any> {
    const { files } = request;
    const { id } = request.params;

    const showcase: Array<RequestFiles> = [];

    function getFiles(myFiles: any) {
      myFiles.map((file: any) => {
        return showcase.push({
          filename: file.filename,
          path: file.destination,
        });
      });
    }

    if (files) {
      getFiles(files);
    } else {
      return response.status(400).json({
        Error:
          'Não foi possível cadastrar um novo produto, é necessário enviar ao menos 1 imagem.',
      });
    }

    const showcaseRepository = getRepository(Showcase);

    showcase.map((showcaseInfo: any) => {
      showcaseInfo.product_id = id;
      return showcaseInfo;
    });

    const newShowcases = showcaseRepository.create(
      showcase.map(sc => ({
        filename: sc.filename,
        path: sc.path,
        thumbnail: false,
        product_id: id,
      })),
    );

    await showcaseRepository.save(newShowcases);

    return response.json({ ok: true });
  },

  async update(request: Request, response: Response): Promise<Product | any> {
    const { product_id } = request.params;
    const {
      product_name,
      product_fullname,
      brand,
      description,
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
      brand,
      description,
      stars,
      status,
      supply,
      price,
    });

    return response.status(200).json(productUpdated);
  },

  async updateStatus(request: Request, response: Response): Promise<any> {
    const { id, setStatus } = request.params;

    const queryBuilder = createQueryBuilder(Product);

    const status = setStatus === 'true';

    try {
      await queryBuilder
        .update(Product)
        .set({ status })
        .where({ product_id: id })
        .execute();

      response.json({ status });
    } catch (error) {
      response.json({ error });
    }
  },

  // TODO: Disparado na tela de detalhe quando atualizado as imagens.
  // async updateShowcase(request: Request, response: Response) { },

  // TODO: Visualizar o detalhe de um produto com as imagens.
  // async getSpecificProductWithImages(request: Request, response: Response) { },

  async detail(request: Request, response: Response): Promise<any> {
    const { id } = request.params;

    const productRepository = getRepository(Product);
    const showcaseRepository = getRepository(Showcase);

    const product = await productRepository.findOne(id);
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
