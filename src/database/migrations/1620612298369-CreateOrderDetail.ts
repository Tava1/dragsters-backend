import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateOrderDetail1620612298369
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'order_detail',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'amount',
            type: 'int',
          },
          {
            name: 'order_id',
            type: 'uuid',
          },
          {
            name: 'product_id',
            type: 'uuid',
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

    await queryRunner.createForeignKey(
      'order_detail',
      new TableForeignKey({
        name: 'orderDetailToOrder',
        columnNames: ['order_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'order',
      }),
    );

    await queryRunner.createForeignKey(
      'order_detail',
      new TableForeignKey({
        name: 'orderDetailToProducts',
        columnNames: ['product_id'],
        referencedColumnNames: ['product_id'],
        referencedTableName: 'products',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('order_detail', 'orderDetailToOrder');

    await queryRunner.dropForeignKey('order_detail', 'orderDetailToProducts');

    await queryRunner.dropTable('order_detail');
  }
}
