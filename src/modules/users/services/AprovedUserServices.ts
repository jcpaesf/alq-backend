import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import User from '../infra/typeorm/entities/User';
import { classToClass } from 'class-transformer';

interface IRequest {
    user_id: string;
    user_auth: string;
}

@injectable()
class AprovedUserServices {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository
    ) { }

    public async execute({ user_id, user_auth }: IRequest): Promise<User> {
        let user = await this.usersRepository.findById(user_auth);

        if (!user) {
            throw new AppError('Usuário não está autenticado');
        }

        if (user.type !== 'admin') {
            throw new AppError('Usuário não é administrador');
        }

        user = await this.usersRepository.findById(user_id);

        if (!user) {
            throw new AppError('Usuário não existe');
        }

        user.aproved = true;

        await this.usersRepository.save(user);

        return classToClass(user);
    }
}

export default AprovedUserServices;