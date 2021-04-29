import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import DeliveryAddress from '../models/DeliveryAddress';

const deliveryAddressController = {
  // TODO: Create new delivery address
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

      console.log(newDeliveryAddress);

      const deliveryAddressData = await deliveryAddressRepository.save(
        newDeliveryAddress,
      );

      return response.status(201).json(deliveryAddressData);
    } catch (error) {
      return response.status(400).json({ message: 'Ocorreu um erro.' });
    }
  },
  // TODO: List all delivery address
  async read(request: Request, response: Response): Promise<any> {
    const { customerID } = request.params;
    try {
      const deliveryAddressRepository = getRepository(DeliveryAddress);

      const deliveryAddress = await deliveryAddressRepository.find({
        where: { customers_id: customerID },
      });
      return response.json(deliveryAddress);
    } catch (error) {
      return response.status(400).json({ message: 'Ocorreu um erro.' });
    }
  },

  // TODO: Detail delivery address by id
  async detail(request: Request, response: Response): Promise<any> {
    const { ID } = request.params;
    try {
      const deliveryAddressRepository = getRepository(DeliveryAddress);

      const deliveryAddress = await deliveryAddressRepository.findOne({
        where: { id: ID },
      });
      return response.json(deliveryAddress);
    } catch (error) {
      return response.status(400).json({ message: 'Ocorreu um erro.' });
    }
  },

  // TODO: Update delivery address by id
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
      return response.json(result);
    } catch (error) {
      return response.status(400).json({ message: 'Ocorreu um erro.' });
    }
  },

  // TODO: Create new delivery address
  async delete(request: Request, response: Response): Promise<any> {
    const { id } = request.params;
    const result = await getRepository(DeliveryAddress)
      .createQueryBuilder()
      .delete()
      .from(DeliveryAddress)
      .where('id = :id', { id })
      .execute();
    return response.status(200).json(result);
  },
};

export default deliveryAddressController;
