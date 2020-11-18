import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export default class AddColumnServiceTimeToUserSpecialties1605571246923 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('user_specialties', new TableColumn({
            name: 'service_time',
            type: 'integer',
            isNullable: true
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('user_specialties', 'service_time');
    }
}
