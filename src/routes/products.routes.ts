import { Router } from 'express';
import CreateProductService from '../services/CreateProductService';

const productsRouter = Router();

// TODO: Listar todos os produtos
productsRouter.get('/', async (request, response) =>
  response.json({ ok: true }),
);

// TODO: Criar produto com imagem
productsRouter.post('/', async (request, response) => {
  const {
    product_name,
    product_fullname,
    stars,
    status,
    supply,
    price,
  } = request.body;

  const createProduct = new CreateProductService();

  try {
    const product = await createProduct.execute({
      product_name,
      product_fullname,
      stars,
      status,
      supply,
      price,
    });

    return response.json(product);
  } catch (error) {
    console.log(error);
  }

  return response.json({ ok: true });
});

export default productsRouter;
