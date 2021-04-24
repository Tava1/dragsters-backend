import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import Customer from '../models/Customer';
import CreateCustomerService from '../services/CreateCustomerService';

const customerController = {
  async read(resquest: Request, response: Response): Promise<Customer | any> {
    try {
      const customersRepository = getRepository(Customer);

      const customers = await customersRepository.find({
        relations: ['billing_address', 'delivery_address'],
      });

      return response.json({ customers });
    } catch (error) {
      return response.status(400).json({ error });
    }
  },

  async create(resquest: Request, response: Response): Promise<Customer | any> {
    const { customer, address } = resquest.body;

    const createCustomer = new CreateCustomerService();

    try {
      const customerCreated = await createCustomer.execute({
        customer,
        address,
      });

      return response.status(201).json(customerCreated);
    } catch (error) {
      return response.status(400).json({ errorMessage: error.message });
    }
  },

  async detail(resquest: Request, response: Response): Promise<Customer | any> {
    const { id } = resquest.params;

    try {
      const customersRepository = getRepository(Customer);

      const customer = await customersRepository.find({
        relations: ['billing_address', 'delivery_address'],
        where: { id },
      });

      return response.status(200).json(customer);
    } catch (error) {
      return response.status(400).json(error);
    }
  },

  /* Customer */

  // TODO: Reset forgotten password

  // TODO: Update customer info by id
};

export default customerController;
