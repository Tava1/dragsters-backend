import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Order from '../models/Order';

import CreateOrderService from '../services/CreateOrderService';

const orderController = {
  async create(request: Request, response: Response): Promise<any> {
    const { order, order_detail } = request.body;

    console.log(request.body);

    const createOrder = new CreateOrderService();

    try {
      const orderCreated = await createOrder.execute({ order, order_detail });
      return response.status(201).json(orderCreated);
    } catch (error) {
      console.log(error);
      return response.status(400).json({ errorMessage: error.message });
    }
  },

  async read(request: Request, response: Response): Promise<any> {
    const { customerID } = request.params;

    try {
      const ordersRepository = getRepository(Order);

      const orders = await ordersRepository.find({
        relations: ['order_detail', 'order_status'],
        where: { customers_id: customerID },
      });

      return response.json({ orders });
    } catch (error) {
      return response.status(400).json({ error });
    }
  },

  async readAll(request: Request, response: Response): Promise<any> {
    try {
      const ordersRepository = getRepository(Order);

      const orders = await ordersRepository.find({
        relations: ['order_detail', 'order_status'],
      });

      return response.json({ orders });
    } catch (error) {
      return response.status(400).json({ error });
    }
  },

  async detail(request: Request, response: Response): Promise<any> {
    const { orderID } = request.params;

    try {
      const ordersRepository = getRepository(Order);

      const order = await ordersRepository.findOne({
        relations: ['order_detail', 'order_status'],
        where: { id: orderID },
      });

      return response.json(order);
    } catch (error) {
      return response.status(400).json({ error });
    }
  },
};

export default orderController;
