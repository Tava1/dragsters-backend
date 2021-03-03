import { getRepository } from 'typeorm';

import Product from '../models/Product';

interface Request {
  product_name: string;
  product_fullname: string;
  stars: number;
  status: boolean;
  supply: number;
  price: number;
}

class CreateProductService {
  public async execute({
    product_name,
    product_fullname,
    stars,
    status,
    supply,
    price,
  }: Request): Promise<Product> {
    const productRepository = getRepository(Product);

    const product = productRepository.create({
      product_name,
      product_fullname,
      stars,
      status,
      supply,
      price,
    });

    console.log(product);

    await productRepository.save(product);

    return product;
  }
}

export default CreateProductService;
