import { getRepository } from 'typeorm';

import Product from '../models/Product';

interface Request {
  product_name: string;
  product_fullname: string;
  brand: string;
  description: string;
  stars: number;
  status: boolean;
  supply: number;
  price: number;
}

class CreateProductService {
  public async execute({
    product_name,
    product_fullname,
    brand,
    description,
    stars,
    status,
    supply,
    price,
  }: Request): Promise<Product> {
    const productRepository = getRepository(Product);

    const newProduct = productRepository.create({
      product_name,
      product_fullname,
      brand,
      description,
      stars,
      status,
      supply,
      price,
    });

    const productData = await productRepository.save(newProduct);

    return productData;
  }
}

export default CreateProductService;
