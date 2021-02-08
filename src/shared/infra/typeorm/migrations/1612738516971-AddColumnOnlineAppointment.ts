import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export default class AddColumnOnlineAppointment1612738516971 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('appointments', new TableColumn({
            name: 'online',
            type: 'boolean',
            default: false
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('appointments', 'online');
    }
}
