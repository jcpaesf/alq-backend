import { inject, injectable } from 'tsyringe';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import IUserEnvironmentsRepository from '../repositories/IUserEnvironmentsRepository';
import UserEnvironment from '../infra/typeorm/entities/UserEnvironment';
import { classToClass } from 'class-transformer'
import IUsersRepository from '../repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
    file: string;
    user_id: string;
}

@injectable()
class CreateUserEnvironmentServices {
    constructor(
        @inject('UserEnvironmentsRepository')
        private userEnvironmentsRepository: IUserEnvironmentsRepository,
        @inject('StorageProvider')
        private storageProvider: IStorageProvider,
        @inject('UsersRepository')
        private usersRepository: IUsersRepository
    ) { }

    public async execute({ file, user_id }: IRequest): Promise<UserEnvironment> {
        const user = await this.usersRepository.findById(user_id);

        if (!user) {
            throw new AppError('Usuário inválido');
        }

        if (user.type !== 'therapist') {
            throw new AppError('Usuário não é terapeuta');
        }

        const fileName = await this.storageProvider.saveFile(file);

        const userEnvironment = await this.userEnvironmentsRepository.create({ file: fileName, user_id });

        return classToClass(userEnvironment);
    }
}

export default CreateUserEnvironmentServices;