import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import BillingAddress from './BillingAddress';
import DeliveryAddress from './DeliveryAddress';

@Entity('customers')
class Customer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  fullname: string;

  @Column()
  date_of_birth: Date;

  @Column()
  gender: string;

  @Column()
  cpf: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  status: boolean;

  @OneToMany(() => DeliveryAddress, deliveryAddress => deliveryAddress.customer)
  delivery_address: DeliveryAddress[];

  @OneToOne(() => BillingAddress, billingAddress => billingAddress.customer)
  billing_address: BillingAddress;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Customer;
