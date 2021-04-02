import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import User from '../models/User';

interface Request {
  fullname: string;
  email: string;
  password: string;
  role: 'admin' | 'stockist';
}

class CreateUserService {
  public async execute({
    fullname,
    email,
    password,
    role,
  }: Request): Promise<User> {
    const userRepository = getRepository(User);

    const emailAlreadyUsed = await userRepository.findOne({ where: { email } });

    if (emailAlreadyUsed) throw new Error('O E-mail digitado já está em uso.');

    const cryptedPassword = await hash(password, 8);
    const defaultStatus = true;

    const user = userRepository.create({
      fullname,
      email,
      password: cryptedPassword,
      status: defaultStatus,
      role,
    });

    const userCreated = await userRepository.save(user);

    return userCreated;
  }
}

export default CreateUserService;
