import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export default class AddColumnStreetUsers1607281262754 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('users', new TableColumn({
            name: 'street',
            type: 'varchar',
            isNullable: true
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('users', 'street');
    }

}
