import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export default class AddColumnStartEndUserSchedules1605665495510 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('user_schedules', new TableColumn({
            name: 'start',
            type: 'varchar',
            isNullable: true
        }));

        await queryRunner.addColumn('user_schedules', new TableColumn({
            name: 'end',
            type: 'varchar',
            isNullable: true
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('user_schedules', 'end');
        await queryRunner.dropColumn('user_schedules', 'start');
    }
}
