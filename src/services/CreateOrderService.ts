import { getRepository, getConnection } from 'typeorm';
import crypto from 'crypto';
import Order from '../models/Order';
import OrderDetail from '../models/OrderDetail';

interface RequestOrder {
  shipping: number;
  total: number;
  customers_id: string;
  delivery_address_id: string;
}

interface RequestOrderDetail {
  product_id: string;
  amount: number;
}

interface Request {
  order: RequestOrder;
  order_detail: RequestOrderDetail[];
}

const STATUS_WAITING_FOR_APPROVAL = 1;

class CreateOrderService {
  public async execute({ order, order_detail }: Request): Promise<any> {
    const orderRepository = getRepository(Order);
    const orderDetailRepository = getRepository(OrderDetail);

    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    let orderInfoResponse;

    const order_number = crypto.randomBytes(8).toString('hex');

    try {
      const newOrder = orderRepository.create({
        order_number,
        shipping: order.shipping,
        total: order.total,
        customers_id: order.customers_id,
        delivery_address_id: order.delivery_address_id,
        order_status_id: STATUS_WAITING_FOR_APPROVAL,
      });

      const orderCreated = await queryRunner.manager.save(newOrder);

      if (!orderCreated)
        throw new Error('Não foi possível prosseguir com o pedido.');

      const newOrderDetail = orderDetailRepository.create(
        order_detail.map(detail => ({
          amount: detail.amount,
          product_id: detail.product_id,
          order_id: orderCreated.id,
        })),
      );

      const orderDetailCreated = await queryRunner.manager.save(newOrderDetail);
      orderInfoResponse = { orderCreated, orderDetailCreated };

      if (!orderInfoResponse)
        throw new Error('Não foi possível prosseguir com o pedido.');

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new Error(error);
    } finally {
      await queryRunner.release();
    }
    return orderInfoResponse;
  }
}

export default CreateOrderService;
