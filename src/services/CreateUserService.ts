import { getRepository } from 'typeorm';
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

    const user = userRepository.create({
      fullname,
      email,
      password,
      status: true,
      role,
    });

    const userCreated = await userRepository.save(user);

    return userCreated;
  }
}

export default CreateUserService;
