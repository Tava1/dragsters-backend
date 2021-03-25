import { getRepository } from 'typeorm';

import Showcase from '../models/Showcase';

interface Request {
  product_id: string;
  filenames: [];
  path: string;
  thumbnail: boolean;
}

class CreateShowcaseService {
  public async execute({
    product_id,
    filenames,
    path,
    thumbnail,
  }: Request): Promise<Showcase | Array<Showcase>> {
    const showcaseRepository = getRepository(Showcase);

    const newShowcases = showcaseRepository.create(
      filenames.map(filename => ({
        product_id,
        filename,
        path,
        thumbnail,
      })),
    );

    const showcaseData = await showcaseRepository.save(newShowcases);

    return showcaseData;
  }
}

export default CreateShowcaseService;
