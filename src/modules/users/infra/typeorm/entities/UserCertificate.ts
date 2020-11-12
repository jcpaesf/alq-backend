import { Expose } from 'class-transformer';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToOne,
    JoinColumn
} from 'typeorm';
import uploadConfig from '@config/upload';

import User from './User';

@Entity('user_certificates')
class UserCertificate {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    file: string;

    @Column('uuid')
    user_id: string;

    @OneToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @Expose({ name: 'file_url' })
    getFileUrl(): string | null {
        if (!this.file) {
            return null;
        }

        switch (uploadConfig.driver) {
            case 'disk':
                return `${process.env.APP_API_URL}/files/${this.file}`
            case 's3':
                return `https://${uploadConfig.config.aws.bucket}.s3.us-east-2.amazonaws.com/${this.file}`
            default:
                return null;
        }
    }
}

export default UserCertificate;