import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateOrder1620612287496 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'order',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'order_number',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'shipping',
            type: 'decimal(10,2)',
          },
          {
            name: 'total',
            type: 'decimal(10,2)',
          },
          {
            name: 'customers_id',
            type: 'uuid',
          },
          {
            name: 'delivery_address_id',
            type: 'uuid',
          },
          {
            name: 'order_status_id',
            type: 'int',
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
      'order',
      new TableForeignKey({
        name: 'orderToOrderStatus',
        columnNames: ['order_status_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'order_status',
      }),
    );

    await queryRunner.createForeignKey(
      'order',
      new TableForeignKey({
        name: 'orderToDeliveryAdresses',
        columnNames: ['delivery_address_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'delivery_adresses',
      }),
    );

    await queryRunner.createForeignKey(
      'order',
      new TableForeignKey({
        name: 'orderToCustomers',
        columnNames: ['customers_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'customers',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('order', 'orderToOrderStatus');

    await queryRunner.dropForeignKey('order', 'orderToDeliveryAdresses');

    await queryRunner.dropForeignKey('order', 'orderToCustomers');

    await queryRunner.dropTable('order');
  }
}
