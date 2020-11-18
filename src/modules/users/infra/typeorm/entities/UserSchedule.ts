import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToOne,
    JoinColumn
} from 'typeorm';

import { Exclude } from 'class-transformer';
import User from './User';

@Entity('user_schedules')
class UserSchedule {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('uuid')
    user_id: string;

    @Column('timestamp with time zone')
    service_date: Date;

    @Exclude()
    @Column('integer')
    start_time: number;

    @Column('varchar')
    start: string;

    @Exclude()
    @Column('integer')
    end_time: number;

    @Column('varchar')
    end: string;

    @OneToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @Exclude()
    @CreateDateColumn()
    created_at: Date;

    @Exclude()
    @UpdateDateColumn()
    updated_at: Date;
}

export default UserSchedule;