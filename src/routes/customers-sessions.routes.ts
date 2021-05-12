import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import AuthenticateCustomerService from '../services/AuthenticateCustomerService';

const customersSessionsRouter = Router();

customersSessionsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().min(3).required(),
    }),
  }),
  async (request, response) => {
    const { email, password } = request.body;

    const authenticateCustomerService = new AuthenticateCustomerService();

    try {
      const { customer, token } = await authenticateCustomerService.execute({
        email,
        password,
      });
      return response.json({ customer, token });
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  },
);

export default customersSessionsRouter;
