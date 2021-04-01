import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Showcase from '../models/Showcase';

import CreateShowcaseService from '../services/CreateShowcaseService';

const showcaseController = {
  async read(request: Request, response: Response): Promise<Showcase[] | any> {
    const showcaseRepository = getRepository(Showcase);

    const showcase = await showcaseRepository.find();

    return response.json(showcase);
  },

  async create(request: Request, response: Response): Promise<Showcase | any> {
    const { product_id, filenames, paths, thumbnail } = request.body;

    const createShowcase = new CreateShowcaseService();

    try {
      const showcase = await createShowcase.execute({
        product_id,
        filenames,
        paths,
        thumbnail,
      });

      return response.status(201).json(showcase);
    } catch (error) {
      return response.json(error);
    }
  },
};

export default showcaseController;
