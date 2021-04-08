import { Request, Response } from 'express';
import { getRepository, createQueryBuilder } from 'typeorm';
import { hash } from 'bcryptjs';

import User from '../models/User';

import CreateUserService from '../services/CreateUserService';

const userController = {
  async read(request: Request, response: Response): Promise<User | any> {
    let { offset, limit } = request.query;

    try {
      const users = await getRepository(User)
        .createQueryBuilder('users')
        .orderBy('users.created_at', 'DESC')
        .skip(Number(offset === undefined ? (offset = '0') : offset))
        .take(Number(limit === undefined ? (limit = '10') : limit))
        .getMany();

      const total = await getRepository(User)
        .createQueryBuilder('users')
        .getCount();

      const usersWithoutPassword = users.map(user => ({
        id: user.id,
        fullname: user.fullname,
        email: user.email,
        status: user.status,
        role: user.role,
        created_at: user.created_at,
        updated_at: user.updated_at,
      }));

      const resquestInfo = {
        offset,
        limit,
        total,
      };

      return response.json({ usersWithoutPassword, resquestInfo });
    } catch (error) {
      return response.json(error);
    }
  },

  async create(request: Request, response: Response): Promise<User | any> {
    if (!request.user.isAdmin)
      return response.json({
        message: 'Usuário não possuí autorização para esta tarefa.',
      });

    const { fullname, email, password, role } = request.body;

    const createUser = new CreateUserService();

    try {
      const user = await createUser.execute({
        fullname,
        email,
        password,
        role,
      });

      const userWithoutPassword = {
        id: user.id,
        fullname: user.fullname,
        email: user.email,
        status: user.status,
        role: user.role,
        created_at: user.created_at,
        updated_at: user.updated_at,
      };

      return response.status(201).json(userWithoutPassword);
    } catch (error) {
      return response.json(error);
    }
  },

  async update(request: Request, response: Response): Promise<User | any> {
    if (!request.user.isAdmin)
      return response.json({
        message: 'Usuário não possuí autorização para esta tarefa.',
      });

    const { id } = request.params;
    const { fullname, role, status } = request.body;

    try {
      const result = await getRepository(User)
        .createQueryBuilder('users')
        .update(User)
        .set({
          fullname,
          status,
          role,
        })
        .where('id = :id', { id })
        .execute();

      return response.status(200).json(result);
    } catch (error) {
      return response.json(error);
    }
  },

  async updatePassword(
    request: Request,
    response: Response,
  ): Promise<User | any> {
    if (!request.user.isAdmin)
      return response.json({
        message: 'Usuário não possuí autorização para esta tarefa.',
      });

    const { id } = request.params;
    const { password } = request.body;

    const cryptedPassword = await hash(password, 8);

    try {
      const result = await getRepository(User)
        .createQueryBuilder('users')
        .update(User)
        .set({
          password: cryptedPassword,
        })
        .where('id = :id', { id })
        .execute();

      return response.status(200).json(result);
    } catch (error) {
      return response.json(error);
    }
  },

  async updateStatus(
    request: Request,
    response: Response,
  ): Promise<User | any> {
    if (!request.user.isAdmin)
      return response.json({
        message: 'Usuário não possuí autorização para esta tarefa.',
      });

    const { id } = request.params;
    const { setStatus } = request.body;

    const queryBuilder = await createQueryBuilder(User);

    const status = setStatus === true;

    try {
      await queryBuilder.update(User).set({ status }).where({ id }).execute();

      return response.status(200).json({ status });
    } catch (error) {
      return response.json({ error });
    }
  },

  async detail(request: Request, response: Response): Promise<User | any> {
    const { id } = request.params;

    try {
      const user = await getRepository(User)
        .createQueryBuilder('users')
        .where('users.id = :id', { id })
        .getOne();

      if (!user)
        throw new Error(
          'Ocorreu um erro, não foi possível encontrar o usuário solicitado',
        );

      const userWithoutPassword = {
        id: user.id,
        fullname: user.fullname,
        email: user.email,
        status: user.status,
        role: user.role,
        created_at: user.created_at,
        updated_at: user.updated_at,
      };

      return response.status(200).json(userWithoutPassword);
    } catch (error) {
      return response.json(error);
    }
  },
};

export default userController;
