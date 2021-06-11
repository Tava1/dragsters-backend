import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import AuthenticateSystemUserService from '../services/AuthenticateSystemUserService';

const sessionsRouter = Router();

sessionsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().min(3).required(),
    }),
  }),
  async (request, response) => {
    const { email, password } = request.body;

    console.log(request.body);

    const authenticateSystemUserService = new AuthenticateSystemUserService();

    const { user, token } = await authenticateSystemUserService.execute({
      email,
      password,
    });

    return response.json({ user, token });
  },
);

export default sessionsRouter;
