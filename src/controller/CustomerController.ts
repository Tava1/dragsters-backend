import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import Customer from '../models/Customer';
import CreateCustomerService from '../services/CreateCustomerService';

const customerController = {
  async read(request: Request, response: Response): Promise<Customer | any> {
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

  async create(request: Request, response: Response): Promise<Customer | any> {
    const { customer, address } = request.body;

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

  async detail(request: Request, response: Response): Promise<Customer | any> {
    const { id } = request.params;

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

  async passwordRecovery(
    request: Request,
    response: Response,
  ): Promise<Customer | any> {
    const { id } = request.params;
    const { password } = request.body;

    const cryptedPassword = await hash(password, 8);

    try {
      const result = await getRepository(Customer)
        .createQueryBuilder('customers')
        .update(Customer)
        .set({
          password: cryptedPassword,
        })
        .where('id = :id', { id })
        .execute();

      const { affected } = result;

      if (affected && affected <= 0) {
        return response.status(400).json({ message: 'Ocorreu um erro.' });
      }

      return response
        .status(200)
        .json({ message: 'Senha alterada com sucesso!' });
    } catch (error) {
      return response.status(400).json(error);
    }
  },

  async update(request: Request, response: Response): Promise<Customer | any> {
    const { id } = request.params;
    const { fullname, date_of_birth, gender, phone } = request.body;

    try {
      const result = await getRepository(Customer)
        .createQueryBuilder('customers')
        .update(Customer)
        .set({
          fullname,
          date_of_birth,
          gender,
          phone,
        })
        .where('id = :id', { id })
        .execute();

      const { affected } = result;

      if (affected && affected <= 0) {
        return response.status(400).json({ message: 'Ocorreu um erro.' });
      }

      return response
        .status(200)
        .json({ message: 'Informações alteradas com sucesso!' });
    } catch (error) {
      return response.status(400).json(error);
    }
  },
};

export default customerController;
