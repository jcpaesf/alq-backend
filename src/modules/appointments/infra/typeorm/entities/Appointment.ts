import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToOne,
    JoinColumn
} from 'typeorm';

import Specialtie from '@modules/users/infra/typeorm/entities/Specialtie';
import User from '@modules/users/infra/typeorm/entities/User';

@Entity('appointments')
class Appointment {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('uuid')
    therapist_id: string;

    @Column('uuid')
    user_id: string;

    @Column('timestamp with time zone')
    date: Date;

    @Column('varchar')
    status: string;

    @Column('uuid')
    specialtie_id: string;

    @OneToOne(() => User)
    @JoinColumn({ name: 'therapist_id' })
    therapist: User;

    @OneToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @OneToOne(() => Specialtie)
    @JoinColumn({ name: 'specialtie_id' })
    specialtie: Specialtie;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default Appointment;