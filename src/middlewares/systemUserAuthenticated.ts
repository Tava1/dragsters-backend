import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '../config/auth';

interface Payload {
  fullname: string;
  email: string;
  role: string;
  isAdmin: boolean;
  iat: number;
  exp: number;
  sub: string;
}

export default function systemUserAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const headersAuthorization = request.headers.authorization;

  if (!headersAuthorization)
    throw new Error('Não foi possível recuperar o token');

  const [, token] = headersAuthorization.split(' ');

  try {
    const decoded = verify(token, authConfig.jwt.secret);

    const { sub, fullname, role, email, isAdmin } = decoded as Payload;

    request.user = {
      id: sub,
      fullname,
      role,
      email,
      isAdmin,
    };

    next();
  } catch (error) {
    response.status(400).json({ error });
  }
}
