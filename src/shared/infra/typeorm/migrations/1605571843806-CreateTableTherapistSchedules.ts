import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export default class CreateTableTherapistSchedules1605571843806 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'user_schedules',
            columns: [{
                name: 'id',
                type: 'uuid',
                isPrimary: true,
                generationStrategy: 'uuid',
                default: 'uuid_generate_v4()'
            }, {
                name: 'user_id',
                type: 'uuid',
                isNullable: false
            }, {
                name: 'service_date',
                type: 'timestamp with time zone',
                isNullable: false
            }, {
                name: 'start_time',
                type: 'integer',
                isNullable: false
            }, {
                name: 'end_time',
                type: 'integer',
                isNullable: false
            }, {
                name: 'created_at',
                type: 'timestamp',
                default: 'now()'
            }, {
                name: 'updated_at',
                type: 'timestamp',
                default: 'now()'
            }]
        }));

        await queryRunner.createForeignKey('user_schedules', new TableForeignKey({
            name: 'UserSchedulesUser',
            columnNames: ['user_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE'
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('user_schedules', 'UserSchedulesUser');
        await queryRunner.dropTable('user_schedules');
    }

}
