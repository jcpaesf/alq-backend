import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import { isAfter, addHours } from 'date-fns';
import IUsersRepository from '../repositories/IUsersRepository';
import IUsersTokenRepository from '../repositories/IUsersTokenRepository';

interface IRequest {
    email: string;
    token: string;
}

@injectable()
class ConfirmEmailUserServices {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
        @inject('UsersTokenRepository')
        private usersTokenRepository: IUsersTokenRepository
    ) { }

    public async execute({ email, token }: IRequest): Promise<void> {
        if (token) {
            const userToken = await this.usersTokenRepository.findByToken(token);

            if (!userToken) {
                throw new AppError('Token inválido');
            }

            const user = await this.usersRepository.findById(userToken.user_id);

            if (!user) {
                throw new AppError('Usuário não existe');
            }

            if (user.email !== email) {
                throw new AppError('E-mail inválido.');
            }

            const tokenCreatedAt = userToken.created_at;
            const compareDate = addHours(tokenCreatedAt, 2);

            if (isAfter(Date.now(), compareDate)) {
                throw new AppError('Token expirado');
            }

            user.confirm_email = true;

            await this.usersRepository.save(user);

            return;
        }

        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new AppError('Usuário inválido');
        }

        user.confirm_email = true;

        await this.usersRepository.save(user);
    }
}

export default ConfirmEmailUserServices;