import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '../config/auth';
import Customer from '../models/Customer';

interface Request {
  email: string;
  password: string;
}

interface CustomerResponse {
  id: string;
  fullname: string;
  email: string;
  created_at: Date;
  updated_at: Date;
}

interface Response {
  customer: CustomerResponse;
  token: string;
}

class AuthenticateCustomerService {
  public async execute({ email, password }: Request): Promise<Response> {
    const customerRepository = getRepository(Customer);

    const customer = await customerRepository.findOne({ where: { email } });

    if (!customer) throw new Error('E-mail ou senha incorreta.');

    const passwordMatched = await compare(password, customer.password);

    if (!passwordMatched) throw new Error('E-mail ou senha incorreta.');

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign(
      {
        fullname: customer.fullname,
        email: customer.email,
      },
      secret,
      {
        subject: customer.id,
        expiresIn,
      },
    );

    const customerWithoutPassword = {
      id: customer.id,
      fullname: customer.fullname,
      email: customer.email,
      created_at: customer.created_at,
      updated_at: customer.updated_at,
    };

    return { customer: customerWithoutPassword, token };
  }
}

export default AuthenticateCustomerService;
