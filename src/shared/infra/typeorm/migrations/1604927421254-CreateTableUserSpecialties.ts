import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export default class CreateTableUserSpecialties1604927421254 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'user_specialties',
            columns: [{
                name: 'id',
                type: 'uuid',
                isPrimary: true,
                generationStrategy: 'uuid',
                default: 'uuid_generate_v4()'
            }, {
                name: 'specialtie_id',
                type: 'uuid',
                isNullable: false
            }, {
                name: 'user_id',
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

        await queryRunner.createForeignKey('user_specialties', new TableForeignKey({
            name: 'UserSpecialtiesUser',
            columnNames: ['user_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE'
        }));

        await queryRunner.createForeignKey('user_specialties', new TableForeignKey({
            name: 'UserSpecialtiesSpecialties',
            columnNames: ['specialtie_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'specialties',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE'
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('user_specialties', 'UserSpecialtiesSpecialties');
        await queryRunner.dropForeignKey('user_specialties', 'UserSpecialtiesUser');
        await queryRunner.dropTable('user_specialties');
    }
}
