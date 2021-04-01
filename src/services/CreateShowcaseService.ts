import { getRepository } from 'typeorm';

import Showcase from '../models/Showcase';

interface Request {
  product_id: string;
  filenames: [];
  paths: [];
  thumbnail: boolean;
}

class CreateShowcaseService {
  public async execute({
    product_id,
    filenames,
    paths,
    thumbnail,
  }: Request): Promise<Showcase | Array<Showcase>> {
    const showcaseRepository = getRepository(Showcase);

    const newShowcases = showcaseRepository.create(
      paths.map(path => ({
        product_id,
        filename: 'none',
        path,
        thumbnail,
      })),
    );

    console.log(newShowcases);

    const showcaseData = await showcaseRepository.save(newShowcases);

    return showcaseData;
  }
}

export default CreateShowcaseService;
