import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import Customer from './Customer';
import DeliveryAddress from './DeliveryAddress';
import OrderDetail from './OrderDetail';
import OrderStatus from './OrderStatus';

@Entity('order')
class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  order_number: string;

  @Column()
  shipping: number;

  @Column()
  total: number;

  @Column()
  customers_id: string;

  @Column()
  delivery_address_id: string;

  @Column()
  order_status_id: number;

  @OneToMany(() => OrderDetail, orderDetail => orderDetail.order)
  order_detail: OrderDetail[];

  @ManyToOne(() => OrderStatus)
  @JoinColumn({ name: 'order_status_id' })
  order_status: OrderStatus;

  @ManyToOne(() => Customer)
  @JoinColumn({ name: 'customers_id' })
  customer: Customer;

  @ManyToOne(() => DeliveryAddress)
  @JoinColumn({ name: 'delivery_address_id' })
  deliveryAddress: DeliveryAddress;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Order;
