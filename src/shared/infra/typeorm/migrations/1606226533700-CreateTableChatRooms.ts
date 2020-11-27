import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export default class CreateTableChatRooms1606226533700 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'chat_rooms',
            columns: [{
                name: 'id',
                type: 'uuid',
                isPrimary: true,
                generationStrategy: 'uuid',
                default: 'uuid_generate_v4()'
            }, {
                name: 'room',
                type: 'uuid',
                generationStrategy: 'uuid',
                default: 'uuid_generate_v4()'
            }, {
                name: 'user_id',
                type: 'uuid',
                isNullable: false
            }, {
                name: 'therapist_id',
                type: 'uuid',
                isNullable: false
            }, {
                name: 'appointment_id',
                type: 'uuid',
                isNullable: false
            }, {
                name: 'socket_id_user',
                type: 'varchar',
                isNullable: true
            }, {
                name: 'socket_id_therapist',
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

        await queryRunner.createForeignKey('chat_rooms', new TableForeignKey({
            name: 'ChatRoomsUser',
            columnNames: ['user_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE'
        }));

        await queryRunner.createForeignKey('chat_rooms', new TableForeignKey({
            name: 'ChatRoomsTherapist',
            columnNames: ['therapist_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE'
        }));

        await queryRunner.createForeignKey('chat_rooms', new TableForeignKey({
            name: 'ChatRoomsAppointment',
            columnNames: ['appointment_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'appointments',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE'
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('chat_rooms', 'ChatRoomsAppointment');
        await queryRunner.dropForeignKey('chat_rooms', 'ChatRoomsTherapist');
        await queryRunner.dropForeignKey('chat_rooms', 'ChatRoomsUser');
        await queryRunner.dropTable('chat_rooms');
    }
}
