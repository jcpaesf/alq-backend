import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToOne,
    JoinColumn
} from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

@Entity('chat_rooms')
class ChatRoom {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('uuid')
    room: string;

    @Column('uuid')
    user_id: string;

    @Column('uuid')
    therapist_id: string;

    @Column('uuid')
    appointment_id: string;

    @Column('varchar')
    socket_id_user: string;

    @Column('varchar')
    socket_id_therapist: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @OneToOne(() => User)
    @JoinColumn({ name: 'therapist_id' })
    therapist: User;

    @OneToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @OneToOne(() => Appointment)
    @JoinColumn({ name: 'appointment_id' })
    appointment: Appointment;
}

export default ChatRoom;