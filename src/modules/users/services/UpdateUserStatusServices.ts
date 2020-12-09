import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
    user_auth_id: string;
    therapist_id: string;
    status: string;
}

@injectable()
class UpdateUserStatusServices {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository
    ) { }

    public async execute({ user_auth_id, therapist_id, status }: IRequest): Promise<void> {
        const user_auth = await this.usersRepository.findById(user_auth_id);

        if (!user_auth) {
            throw new AppError('Usuário não encontrado');
        }

        if (user_auth.type !== 'admin' && (status === 'analyzing' || status === 'approved' || status === 'declined')) {
            throw new AppError('Usuário logado não é administrador');
        }

        const therapist = await this.usersRepository.findById(therapist_id);

        if (!therapist) {
            throw new AppError('Terapeuta não encontrado');
        }

        if (therapist.type !== 'therapist') {
            throw new AppError('Usuário não é terapeuta');
        }

        therapist.status = status;

        await this.usersRepository.save(therapist);
    }
}

export default UpdateUserStatusServices;