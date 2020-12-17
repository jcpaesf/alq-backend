import { inject, injectable } from 'tsyringe';
import IUserResumesRepository from '../repositories/IUserResumesRepository';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import AppError from '@shared/errors/AppError';

interface IRequest {
    user_id: string;
    id: string;
}

@injectable()
class DeleteUserResumeServices {
    constructor(
        @inject('StorageProvider')
        private storageProvider: IStorageProvider,
        @inject('UserResumesRepository')
        private userResumesRepository: IUserResumesRepository
    ) { }

    public async execute({ user_id, id }: IRequest): Promise<void> {
        const userResume = await this.userResumesRepository.findById(id);

        if (!userResume) {
            throw new AppError('Currículo não encontrado');
        }

        if (userResume.user_id !== user_id) {
            throw new AppError('Currículo não pertence ao usuário');
        }

        await this.storageProvider.deleteFile(userResume.file);
        await this.userResumesRepository.delete(id);
    }
}

export default DeleteUserResumeServices;