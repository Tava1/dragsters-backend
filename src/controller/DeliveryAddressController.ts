import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import DeliveryAddress from '../models/DeliveryAddress';

const deliveryAddressController = {
  async create(request: Request, response: Response): Promise<any> {
    const { customerID } = request.params;

    const {
      fullname,
      zip_code,
      address,
      complement,
      number,
      neighborhood,
      state,
      city,
      reference_point,
    } = request.body;

    try {
      const deliveryAddressRepository = getRepository(DeliveryAddress);

      const newDeliveryAddress = deliveryAddressRepository.create({
        fullname,
        zip_code,
        address,
        complement,
        number,
        neighborhood,
        state,
        city,
        reference_point,
        customers_id: customerID,
      });

      const deliveryAddressData = await deliveryAddressRepository.save(
        newDeliveryAddress,
      );

      return response.status(201).json(deliveryAddressData);
    } catch (error) {
      return response.status(400).json({ message: 'Ocorreu um erro.' });
    }
  },

  async read(request: Request, response: Response): Promise<any> {
    const { customerID } = request.params;

    try {
      const deliveryAddressRepository = getRepository(DeliveryAddress);

      const deliveryAddress = await deliveryAddressRepository.find({
        where: { customers_id: customerID },
      });

      return response.status(200).json(deliveryAddress);
    } catch (error) {
      return response.status(400).json({ message: 'Ocorreu um erro.' });
    }
  },

  async detail(request: Request, response: Response): Promise<any> {
    const { id } = request.params;

    try {
      const deliveryAddressRepository = getRepository(DeliveryAddress);

      const deliveryAddress = await deliveryAddressRepository.findOne({
        where: { id },
      });

      return response.status(200).json(deliveryAddress);
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
      const result = await getRepository(DeliveryAddress)
        .createQueryBuilder('delivery_adresses')
        .update(DeliveryAddress)
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

      return response.status(200).json(result);
    } catch (error) {
      return response.status(400).json({ message: 'Ocorreu um erro.' });
    }
  },

  async delete(request: Request, response: Response): Promise<any> {
    const { id } = request.params;

    try {
      const result = await getRepository(DeliveryAddress)
        .createQueryBuilder()
        .delete()
        .from(DeliveryAddress)
        .where('id = :id', { id })
        .execute();

      return response.status(200).json(result);
    } catch (error) {
      return response.status(400).json({ message: 'Ocorreu um erro.' });
    }
  },
};

export default deliveryAddressController;
