import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import BillingAddress from '../models/BillingAddress';

const billingAddressController = {
  async read(request: Request, response: Response): Promise<any> {
    const { customerID } = request.params;

    try {
      const billingAddressRepository = getRepository(BillingAddress);

      const billingAddress = await billingAddressRepository.findOne({
        where: { customers_id: customerID },
      });

      return response.json(billingAddress);
    } catch (error) {
      return response.status(400).json({ message: 'Ocorreu um erro.' });
    }
  },

  async update(request: Request, response: Response): Promise<any> {
    const { id } = request.params;
    const {
      fullname,
      zip_code,
      address,
      complement,
      number,
      neighborhood,
      city,
      state,
      reference_point,
    } = request.body;

    try {
      const result = await getRepository(BillingAddress)
        .createQueryBuilder('billing_adresses')
        .update(BillingAddress)
        .set({
          fullname,
          zip_code,
          address,
          complement,
          number,
          neighborhood,
          city,
          state,
          reference_point,
        })
        .where('id = :id', { id })
        .execute();
      return response.json(result);
    } catch (error) {
      return response.status(400).json({ message: 'Ocorreu um erro.' });
    }
  },
};

export default billingAddressController;
