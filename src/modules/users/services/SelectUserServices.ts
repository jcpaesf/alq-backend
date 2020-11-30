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
class SelectUserServices {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository
    ) { }

    public async execute({ user_id, user_auth }: IRequest): Promise<User[] | User> {
        const userAuth = await this.usersRepository.findById(user_auth);

        if (!userAuth) {
            throw new AppError('Usuário não autenticado');
        }

        if (userAuth.type !== 'admin') {
            throw new AppError('Usuário não é administrador');
        }

        let user: User[] | User | undefined;

        if (user_id) {
            user = await this.usersRepository.findById(user_id);

            if (!user) {
                throw new AppError('Usuário não encontrado');
            }

            return classToClass(user);
        }

        user = await this.usersRepository.find();

        return classToClass(user);
    }
}

export default SelectUserServices;