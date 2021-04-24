import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Customer from './Customer';

@Entity('delivery_adresses')
class DeliveryAddress {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  fullname: string;

  @Column()
  zip_code: string;

  @Column()
  address: string;

  @Column()
  complement: string;

  @Column()
  number: string;

  @Column()
  neighborhood: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  reference_point: string;

  @Column()
  customers_id: string;

  // @ManyToOne(() => Customer, customer => customer.delivery_address)
  // customer: Customer;

  @ManyToOne(() => Customer)
  @JoinColumn({ name: 'customers_id' })
  customer: Customer;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default DeliveryAddress;
