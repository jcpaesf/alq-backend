import { MigrationInterface, QueryRunner, Table } from "typeorm";

export default class CreateTableUsers1604883922995 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'users',
            columns: [{
                name: 'id',
                type: 'uuid',
                isPrimary: true,
                generationStrategy: 'uuid',
                default: 'uuid_generate_v4()'
            }, {
                name: 'name',
                type: 'varchar',
                isNullable: false
            }, {
                name: 'email',
                type: 'varchar',
                isNullable: false
            }, {
                name: 'password',
                type: 'varchar',
                isNullable: false
            }, {
                name: 'phone',
                type: 'varchar',
                isNullable: true
            }, {
                name: 'city',
                type: 'varchar',
                isNullable: true
            }, {
                name: 'neighborhood',
                type: 'varchar',
                isNullable: true
            }, {
                name: 'postal_code',
                type: 'varchar',
                isNullable: true
            }, {
                name: 'state',
                type: 'varchar',
                isNullable: true
            }, {
                name: 'work_presential',
                type: 'boolean',
                default: false
            }, {
                name: 'work_online',
                type: 'boolean',
                default: false
            }, {
                name: 'type',
                type: 'varchar',
                isNullable: false,
                default: 'user'
            }, {
                name: 'aproved',
                type: 'boolean',
                default: false
            }, {
                name: 'active',
                type: 'boolean',
                default: true
            }, {
                name: 'confirm_email',
                type: 'boolean',
                default: false
            }, {
                name: 'avatar',
                type: 'varchar',
                isNullable: true
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
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users');
    }
}
