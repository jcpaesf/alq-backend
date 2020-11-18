import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export default class CreateTableAppointments1605571853986 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'appointments',
            columns: [{
                name: 'id',
                type: 'uuid',
                isPrimary: true,
                generationStrategy: 'uuid',
                default: 'uuid_generate_v4()'
            }, {
                name: 'therapist_id',
                type: 'uuid',
                isNullable: false
            }, {
                name: 'user_id',
                type: 'uuid',
                isNullable: false
            }, {
                name: 'date',
                type: 'timestamp with time zone',
                isNullable: false
            }, {
                name: 'status',
                type: 'varchar',
                isNullable: false
            }, {
                name: 'specialtie_id',
                type: 'uuid',
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

        await queryRunner.createForeignKey('appointments', new TableForeignKey({
            name: 'AppointmentsTherapists',
            columnNames: ['therapist_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE'
        }));

        await queryRunner.createForeignKey('appointments', new TableForeignKey({
            name: 'AppointmentsUsers',
            columnNames: ['user_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE'
        }));

        await queryRunner.createForeignKey('appointments', new TableForeignKey({
            name: 'AppointmentsSpecialties',
            columnNames: ['specialtie_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'specialties',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE'
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('appointments', 'AppointmentsSpecialties');
        await queryRunner.dropForeignKey('appointments', 'AppointmentsUsers');
        await queryRunner.dropForeignKey('appointments', 'AppointmentsTherapists');
        await queryRunner.dropTable('appointments');
    }
}
