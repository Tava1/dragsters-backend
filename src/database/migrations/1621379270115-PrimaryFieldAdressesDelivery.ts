import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class PrimaryFieldAdressesDelivery1621379270115
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'delivery_adresses',
      new TableColumn({
        name: 'primary',
        type: 'boolean',
        default: 'false',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('delivery_adresses', 'primary');
  }
}
