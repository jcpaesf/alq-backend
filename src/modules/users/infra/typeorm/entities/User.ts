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

    @Column('varchar')
    status: string;

    @Column('boolean')
    @Exclude()
    aproved: boolean;

    @Column('boolean')
    @Exclude()
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