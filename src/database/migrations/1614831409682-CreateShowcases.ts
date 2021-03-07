import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class CreateShowcases1614831409682
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'showcases',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'filename',
            type: 'varchar',
          },
          {
            name: 'path',
            type: 'varchar',
          },
          {
            name: 'thumbnail',
            type: 'boolean',
            isNullable: true,
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

    await queryRunner.addColumn(
      'showcases',
      new TableColumn({
        name: 'product_id',
        type: 'uuid',
      }),
    );

    await queryRunner.createForeignKey(
      'showcases',
      new TableForeignKey({
        name: 'ProductShowcase',
        columnNames: ['product_id'],
        referencedColumnNames: ['product_id'],
        referencedTableName: 'products',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('showcases', 'ProductShowcase');

    await queryRunner.dropColumn('showcases', 'product_id');

    await queryRunner.dropTable('showcases');
  }
}
