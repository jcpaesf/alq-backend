import { inject, injectable } from 'tsyringe';
import IUserSpecialtiesRepository from '../repositories/IUserSpecialtiesRepository';
import UserSpecialtie from '../infra/typeorm/entities/UserSpecialtie';
import IUsersRepository from '../repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';

@injectable()
class SelectUserSpecialtiesServices {
    constructor(
        @inject('UserSpecialtiesRepository')
        private userSpecialtiesRepository: IUserSpecialtiesRepository,
        @inject('UsersRepository')
        private usersRepository: IUsersRepository
    ) { }

    public async execute(user_id: string): Promise<UserSpecialtie[]> {
        const user = await this.usersRepository.findById(user_id);

        if (!user) {
            throw new AppError('Usuário não encontrado');
        }

        const userSpecialties = await this.userSpecialtiesRepository.findByUserId({
            user_id,
            relations: ['specialtie']
        });

        return userSpecialties;
    }
}

export default SelectUserSpecialtiesServices;