import { inject, injectable } from 'tsyringe';
import IUserSchedulesRepository from '../repositories/IUserSchedulesRepository';
import IUsersRepository from '../repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
    id: string;
    user_id: string;
}

@injectable()
class DeleteUserSchedulesServices {
    constructor(
        @inject('UserSchedulesRepository')
        private userSchedulesRepository: IUserSchedulesRepository,
        @inject('UsersRepository')
        private usersRepository: IUsersRepository
    ) { }

    public async execute({ id, user_id }: IRequest): Promise<void> {
        const user = await this.usersRepository.findById(user_id);

        if (!user) {
            throw new AppError('Usuário não encontrado');
        }

        const userSpecialtie = await this.userSchedulesRepository.findById(id);

        if (!userSpecialtie) {
            throw new AppError('Agenda não encontrada');
        }

        if (userSpecialtie.user_id !== user_id) {
            throw new AppError('Agenda não pertence ao usuário logado');
        }

        await this.userSchedulesRepository.delete(id);
    }
}

export default DeleteUserSchedulesServices;