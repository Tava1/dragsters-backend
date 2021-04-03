import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import User from '../models/User';
import authConfig from '../config/auth';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

class AuthenticateSystemUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne({ where: { email } });

    if (!user) throw new Error('E-mail ou senha incorreta.');

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) throw new Error('E-mail ou senha incorreta.');

    if (!user.status)
      throw new Error(
        'Usuário sem permissão de acesso ao sistema, o mesmo encontra-se inativo.',
      );

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign(
      {
        fullname: user.fullname,
        email: user.email,
        role: user.role,
        isAdmin: user.role === 'admin',
      },
      secret,
      {
        subject: user.id,
        expiresIn,
      },
    );

    return { user, token };
  }
}

export default AuthenticateSystemUserService;
