import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('showcases')
class Showcase {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  filename: string;

  @Column()
  path: string;

  @Column()
  thumbnail: boolean;

  @Column()
  product_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Showcase;
