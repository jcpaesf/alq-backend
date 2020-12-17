import { inject, injectable } from 'tsyringe';
import IUserCertificatesRepository from '../repositories/IUserCertificatesRepository';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import AppError from '@shared/errors/AppError';

interface IRequest {
    user_id: string;
    id: string;
}

@injectable()
class DeleteUserCertificateServices {
    constructor(
        @inject('StorageProvider')
        private storageProvider: IStorageProvider,
        @inject('UserCertificatesRepository')
        private userCertificatesRepository: IUserCertificatesRepository
    ) { }

    public async execute({ user_id, id }: IRequest): Promise<void> {
        const userCertificate = await this.userCertificatesRepository.findById(id);

        if (!userCertificate) {
            throw new AppError('Certificado não encontrado');
        }

        if (userCertificate.user_id !== user_id) {
            throw new AppError('Certificado não pertence ao usuário');
        }

        await this.storageProvider.deleteFile(userCertificate.file);
        await this.userCertificatesRepository.delete(id);
    }
}

export default DeleteUserCertificateServices;