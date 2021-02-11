import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export default class AddNewColumnsAppointments1613007027561 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumns('appointments', [
            new TableColumn({
                name: 'start_call_therapist',
                type: 'timestamp with time zone',
                isNullable: true
            }), new TableColumn({
                name: 'start_call_user',
                type: 'timestamp with time zone',
                isNullable: true
            }), new TableColumn({
                name: 'finish_call_therapist',
                type: 'timestamp with time zone',
                isNullable: true
            }), new TableColumn({
                name: 'finish_call_user',
                type: 'timestamp with time zone',
                isNullable: true
            }), new TableColumn({
                name: 'rating',
                type: 'integer',
                isNullable: true
            })
        ]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('appointments', 'start_call_therapist');
        await queryRunner.dropColumn('appointments', 'start_call_user');
        await queryRunner.dropColumn('appointments', 'finish_call_therapist');
        await queryRunner.dropColumn('appointments', 'finish_call_user');
        await queryRunner.dropColumn('appointments', 'rating');
    }
}
