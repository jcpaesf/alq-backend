import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('specialties')
class Specialties {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar')
    description: string;

    @Column('boolean')
    active: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default Specialties;