import { getRepository, getConnection } from 'typeorm';
import { hash } from 'bcryptjs';

import Customer from '../models/Customer';
import DeliveryAddress from '../models/DeliveryAddress';
import BillingAddress from '../models/BillingAddress';

interface RequestCustomer {
  fullname: string;
  date_of_birth: Date;
  gender: string;
  cpf: string;
  phone: string;
  email: string;
  password: string;
}
interface RequestAddress {
  zip_code: string;
  address: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  reference_point: string;
}

interface Request {
  customer: RequestCustomer;
  address: RequestAddress;
}

interface Response {
  customer: Customer;
  address: DeliveryAddress;
}

class CreateCustomerService {
  public async execute({
    customer,
    address,
  }: Request): Promise<Response | any> {
    const customerRepository = getRepository(Customer);
    const deliveryAddressRepository = getRepository(DeliveryAddress);
    const billingAdressesRepository = getRepository(BillingAddress);

    const cpfAlreadyUsed = await customerRepository.findOne({
      where: { cpf: customer.cpf },
    });

    if (cpfAlreadyUsed) throw new Error('CPF Em uso!');

    const emailAlreadyUsed = await customerRepository.findOne({
      where: { email: customer.email },
    });

    if (emailAlreadyUsed) throw new Error('O E-mail digitado já está em uso.');

    const cryptedPassword = await hash(customer.password, 8);
    const defaultStatus = true;

    const newCustomer = customerRepository.create({
      fullname: customer.fullname,
      date_of_birth: customer.date_of_birth,
      gender: customer.gender,
      cpf: customer.cpf,
      phone: customer.phone,
      email: customer.email,
      password: cryptedPassword,
      status: defaultStatus,
    });

    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const customerCreated = await queryRunner.manager.save(newCustomer);

      const newDeliveryAddress = deliveryAddressRepository.create({
        fullname: customerCreated.fullname,
        zip_code: address.zip_code,
        address: address.address,
        number: address.number,
        complement: address.complement,
        neighborhood: address.neighborhood,
        city: address.city,
        state: address.state,
        reference_point: address.reference_point,
        customers_id: customerCreated.id,
      });

      const newBillingAdresses = billingAdressesRepository.create({
        fullname: customerCreated.fullname,
        zip_code: address.zip_code,
        address: address.address,
        number: address.number,
        complement: address.complement,
        neighborhood: address.neighborhood,
        city: address.city,
        state: address.state,
        reference_point: address.reference_point,
        customers_id: customerCreated.id,
      });

      await queryRunner.manager.save(newDeliveryAddress);
      await queryRunner.manager.save(newBillingAdresses);

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      return error;
    } finally {
      await queryRunner.release();
    }

    return true;
  }
}

export default CreateCustomerService;
