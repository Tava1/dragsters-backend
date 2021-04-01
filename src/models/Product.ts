import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import Showcase from './Showcase';

@Entity('products')
class Product {
  @PrimaryGeneratedColumn('uuid')
  product_id: string;

  @Column()
  product_name: string;

  @Column()
  product_fullname: string;

  @Column()
  brand: string;

  @Column()
  description: string;

  @Column()
  stars: number;

  @Column()
  status: boolean;

  @Column()
  supply: number;

  @Column()
  price: number;

  @OneToMany(() => Showcase, showcase => showcase.product)
  showcases: Showcase[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Product;
