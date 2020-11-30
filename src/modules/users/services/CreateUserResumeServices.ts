import { inject, injectable } from 'tsyringe';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import IUserResumesRepository from '../repositories/IUserResumesRepository';
import UserResume from '../infra/typeorm/entities/UserResume';
import { classToClass } from 'class-transformer'
import IUsersRepository from '../repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
    file: string;
    user_id: string;
}

@injectable()
class CreateUserResumeServices {
    constructor(
        @inject('UserResumesRepository')
        private userResumesRepository: IUserResumesRepository,
        @inject('StorageProvider')
        private storageProvider: IStorageProvider,
        @inject('UsersRepository')
        private usersRepository: IUsersRepository
    ) { }

    public async execute({ file, user_id }: IRequest): Promise<UserResume> {
        const user = await this.usersRepository.findById(user_id);

        if (!user) {
            throw new AppError('Usuário inválido');
        }

        if (user.type !== 'therapist') {
            throw new AppError('Usuário não é terapeuta');
        }

        const fileName = await this.storageProvider.saveFile(file);

        const userResume = await this.userResumesRepository.create({ file: fileName, user_id });

        return classToClass(userResume);
    }
}

export default CreateUserResumeServices;