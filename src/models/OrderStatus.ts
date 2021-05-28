import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import Order from './Order';

@Entity('order_status')
class OrderStatus {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  description: string;

  @OneToMany(() => Order, order => order.order_status)
  order: Order[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default OrderStatus;
