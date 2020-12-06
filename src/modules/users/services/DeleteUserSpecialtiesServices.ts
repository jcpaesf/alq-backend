import { inject, injectable } from 'tsyringe';
import IUserSpecialtiesRepository from '../repositories/IUserSpecialtiesRepository';
import IUsersRepository from '../repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
    id: string;
    user_id: string;
}

@injectable()
class DeleteUserSpecialtiesServices {
    constructor(
        @inject('UserSpecialtiesRepository')
        private userSpecialtiesRepository: IUserSpecialtiesRepository,
        @inject('UsersRepository')
        private usersRepository: IUsersRepository
    ) { }

    public async execute({ id, user_id }: IRequest): Promise<void> {
        const user = await this.usersRepository.findById(user_id);

        if (!user) {
            throw new AppError('Usuário não encontrado');
        }

        const userSpecialtie = await this.userSpecialtiesRepository.findById(id);

        if (!userSpecialtie) {
            throw new AppError('Especialidade não encontrada');
        }

        if (userSpecialtie.user_id !== user_id) {
            throw new AppError('Especialidade não pertence ao usuário logado');
        }

        await this.userSpecialtiesRepository.delete(id);
    }
}

export default DeleteUserSpecialtiesServices;