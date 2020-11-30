import { inject, injectable } from 'tsyringe';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import IUserCertificatesRepository from '../repositories/IUserCertificatesRepository';
import UserCertificate from '../infra/typeorm/entities/UserCertificate';
import { classToClass } from 'class-transformer'
import IUsersRepository from '../repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
    file: string;
    user_id: string;
}

@injectable()
class CreateUserCertificateServices {
    constructor(
        @inject('UserCertificatesRepository')
        private userCertificatesRepository: IUserCertificatesRepository,
        @inject('StorageProvider')
        private storageProvider: IStorageProvider,
        @inject('UsersRepository')
        private usersRepository: IUsersRepository
    ) { }

    public async execute({ file, user_id }: IRequest): Promise<UserCertificate> {
        const user = await this.usersRepository.findById(user_id);

        if (!user) {
            throw new AppError('Usuário inválido');
        }

        if (user.type !== 'therapist') {
            throw new AppError('Usuário não é terapeuta');
        }

        const fileName = await this.storageProvider.saveFile(file);

        const userCertificate = await this.userCertificatesRepository.create({ file: fileName, user_id });

        return classToClass(userCertificate);
    }
}

export default CreateUserCertificateServices;