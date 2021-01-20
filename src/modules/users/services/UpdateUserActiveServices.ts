import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
    user_id: string;
    auth_user: string;
}

@injectable()
class UpdateUserActiveServices {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository
    ) { }

    public async execute({ user_id, auth_user }: IRequest): Promise<void> {
        let user = await this.usersRepository.findById(auth_user);

        if (!user) throw new AppError('Usuário não encontrado');

        if (user.type !== 'admin') throw new AppError('Usuário não é administrador');

        user = await this.usersRepository.findById(user_id);

        if (!user) throw new AppError('Usuário não encontrado');

        user.active = !user.active;

        await this.usersRepository.save(user);
    }
}

export default UpdateUserActiveServices;