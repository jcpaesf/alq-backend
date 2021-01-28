import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export default class AddColumnSummaryUsers1611421898551 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('users', new TableColumn({
            name: 'summary',
            type: 'varchar',
            isNullable: true
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('users', 'summary');
    }

}
