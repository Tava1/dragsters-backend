import { response } from 'express';
import { getRepository } from 'typeorm';

import Product from '../models/Product';

interface Request {
  product_id: string;
  product_name: string;
  product_fullname: string;
  brand: string;
  description: string;
  stars: number;
  status: boolean;
  supply: number;
  price: number;
}

class UpdateProductService {
  public async execute({
    product_id,
    product_name,
    product_fullname,
    brand,
    description,
    stars,
    status,
    supply,
    price,
  }: Request): Promise<Product | null> {
    const productRepository = getRepository(Product);

    const product = await productRepository.findOne(product_id);

    if (product) {
      product.product_name = product_name;
      product.product_fullname = product_fullname;
      product.brand = brand;
      product.description = description;
      product.stars = stars;
      product.status = status;
      product.supply = supply;
      product.price = price;

      const updatedProduct = await productRepository.save(product);

      return updatedProduct;
    }

    return null;
  }
}

export default UpdateProductService;
