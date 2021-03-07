import { getRepository } from 'typeorm';

import Product from '../models/Product';
import Showcase from '../models/Showcase';

interface RequestShowcase {
  filename: string;
  path: string;
  product_id?: string;
}

interface Request {
  product_name: string;
  product_fullname: string;
  stars: number;
  status: boolean;
  supply: number;
  price: number;
  showcase: RequestShowcase[];
}

class CreateProductService {
  public async execute({
    product_name,
    product_fullname,
    stars,
    status,
    supply,
    price,
    showcase,
  }: Request): Promise<Product> {
    const productRepository = getRepository(Product);

    const newProduct = productRepository.create({
      product_name,
      product_fullname,
      stars,
      status,
      supply,
      price,
    });

    const productData = await productRepository.save(newProduct);

    const showcaseRepository = getRepository(Showcase);

    showcase.map((showcaseInfo: any) => {
      showcaseInfo.product_id = productData.product_id;
      return showcaseInfo;
    });

    const newShowcases = showcaseRepository.create(
      showcase.map(sc => ({
        filename: sc.filename,
        path: sc.path,
        thumbnail: false,
        product_id: sc.product_id,
      })),
    );

    await showcaseRepository.save(newShowcases);

    return productData;
  }
}

export default CreateProductService;
