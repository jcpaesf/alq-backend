import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export default class AddColumnDescriptionUsers1611016394612 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('users', new TableColumn({
            name: 'description',
            type: 'varchar',
            isNullable: true
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('users', 'description');
    }

}
