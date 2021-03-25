import { getRepository, createQueryBuilder } from 'typeorm';

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
  }: Request): Promise<Product | void> {
    const queryBuilder = createQueryBuilder(Product);

    console.log(product_id);

    try {
      const result = await queryBuilder
        .update(Product)
        .set({
          product_name,
          product_fullname,
          brand,
          description,
          status,
          supply,
          price,
        })
        .where({ product_id })
        .execute();
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }
}

export default UpdateProductService;
