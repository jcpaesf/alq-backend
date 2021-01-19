import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export default class DeleteColumnAprovedUsers1611017344771 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('users', 'aproved');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('users', new TableColumn({
            name: 'aproved',
            type: 'boolean',
            default: false
        }));
    }

}
