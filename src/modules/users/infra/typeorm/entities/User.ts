import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
enum TypeUser {
    User = 'user',
    Therapist = 'therapist',
    Admin = 'admin'
}
import uploadConfig from '@config/upload';
import { Exclude, Expose } from 'class-transformer';

@Entity('users')
class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar')
    name: string;

    @Column('varchar')
    email: string;

    @Column('varchar')
    @Exclude()
    password: string;

    @Column('varchar')
    phone: string;

    @Column('varchar')
    city: string;

    @Column('varchar')
    neighborhood: string;

    @Column('varchar')
    postal_code: string;

    @Column('varchar')
    state: string;

    @Column('varchar')
    street: string;

    @Column('boolean')
    work_presential: boolean;

    @Column('boolean')
    work_online: boolean;

    @Column('varchar')
    type: TypeUser;

    @Expose({ name: 'type_string' })
    getTypeString(): string {
        switch (this.type) {
            case 'admin':
                return 'Administrador';
            case 'user':
                return 'Cliente';
            case 'therapist':
                return 'Terapeuta';
            default:
                return 'Tipo não encontrado';
        }
    }

    @Column('varchar')
    status: string;

    @Expose({ name: 'status_string' })
    getStatusString(): string {
        if (this.type !== 'therapist') return '';

        switch (this.status) {
            case '' || null:
                return 'Pendente';
            case 'analyzing':
                return 'Analisando';
            case 'approved':
                return 'Aprovado';
            case 'declinde':
                return 'Reprovado';
            default:
                return 'Status não encontrado';
        }
    }

    @Column('boolean')
    active: boolean;

    @Column('boolean')
    @Exclude()
    confirm_email: boolean;

    @Column('varchar')
    avatar: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @Column('varchar')
    description: string;

    @Expose({ name: 'avatar_url' })
    getAvatarUrl(): string | null {
        if (!this.avatar) {
            return null;
        }

        switch (uploadConfig.driver) {
            case 'disk':
                return `${process.env.APP_API_URL}/files/${this.avatar}`
            case 's3':
                return `https://${uploadConfig.config.aws.bucket}.s3.us-east-2.amazonaws.com/${this.avatar}`
            default:
                return null;
        }
    }
}

export default User;