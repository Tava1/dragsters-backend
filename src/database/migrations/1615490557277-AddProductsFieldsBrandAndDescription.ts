import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddProductsFieldsBrandAndDescription1615490557277
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'products',
      new TableColumn({
        name: 'brand',
        type: 'varchar',
      }),
    );

    await queryRunner.addColumn(
      'products',
      new TableColumn({
        name: 'description',
        type: 'varchar',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('products', 'brand');
    await queryRunner.dropColumn('products', 'description');
  }
}
