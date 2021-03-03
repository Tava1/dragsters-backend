import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateProducts1614624511722 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'products',
        columns: [
          {
            name: 'product_id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'product_name',
            type: 'varchar',
          },
          {
            name: 'product_fullname',
            type: 'varchar',
          },
          {
            name: 'stars',
            type: 'int',
          },
          {
            name: 'status',
            type: 'boolean',
          },
          {
            name: 'supply',
            type: 'int',
          },
          {
            name: 'price',
            type: 'decimal(10,2)',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('products');
  }
}
