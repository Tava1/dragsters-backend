import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateDeliveryAdresses1617937463370
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'delivery_adresses',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'fullname',
            type: 'varchar',
          },
          {
            name: 'zip_code',
            type: 'char(9)',
          },
          {
            name: 'address',
            type: 'varchar',
          },
          {
            name: 'complement',
            type: 'varchar',
          },
          {
            name: 'number',
            type: 'varchar',
          },
          {
            name: 'neighborhood',
            type: 'varchar',
          },
          {
            name: 'city',
            type: 'varchar',
          },
          {
            name: 'state',
            type: 'char(2)',
          },
          {
            name: 'reference_point',
            type: 'varchar',
          },
          {
            name: 'customers_id',
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
      'delivery_adresses',
      new TableForeignKey({
        name: 'deliveryAdressesToCustomers',
        columnNames: ['customers_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'customers',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'delivery_adresses',
      'deliveryAdressesToCustomers',
    );

    await queryRunner.dropTable('delivery_adresses');
  }
}
