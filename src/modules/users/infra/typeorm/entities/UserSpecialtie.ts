import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToOne,
    JoinColumn
} from 'typeorm';

import Specialtie from './Specialtie';
import User from './User';

@Entity('user_specialties')
class UserSpecialtie {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('uuid')
    specialtie_id: string;

    @Column('uuid')
    user_id: string;

    @OneToOne(() => Specialtie)
    @JoinColumn({ name: 'specialtie_id' })
    specialtie: Specialtie;

    @OneToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default UserSpecialtie;