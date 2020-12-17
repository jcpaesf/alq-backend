import { inject, injectable } from 'tsyringe';
import IUserEnvironmentsRepository from '../repositories/IUserEnvironmentsRepository';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import AppError from '@shared/errors/AppError';

interface IRequest {
    user_id: string;
    id: string;
}

@injectable()
class DeleteUserEnvironmentServices {
    constructor(
        @inject('StorageProvider')
        private storageProvider: IStorageProvider,
        @inject('UserEnvironmentsRepository')
        private userEnvironmentsRepository: IUserEnvironmentsRepository
    ) { }

    public async execute({ user_id, id }: IRequest): Promise<void> {
        const userEnvironment = await this.userEnvironmentsRepository.findById(id);

        if (!userEnvironment) {
            throw new AppError('Currículo não encontrado');
        }

        if (userEnvironment.user_id !== user_id) {
            throw new AppError('Currículo não pertence ao usuário');
        }

        await this.storageProvider.deleteFile(userEnvironment.file);
        await this.userEnvironmentsRepository.delete(id);
    }
}

export default DeleteUserEnvironmentServices;