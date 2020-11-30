import { inject, injectable } from 'tsyringe';
import UserSpecialtie from '../infra/typeorm/entities/UserSpecialtie';
import IUserSpecialtiesRepository from '../repositories/IUserSpecialtiesRepository';
import convertHourToMinutes from '@shared/utils/convertHourToMinutes';
import ISpecialtiesRepository from '../repositories/ISpecialtiesRepository';
import IUsersRepository from '../repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
    specialtie_id: string;
    user_id: string;
    service_time: string;
}

@injectable()
class CreateUserSpecialtieServices {
    constructor(
        @inject('UserSpecialtiesRepository')
        private userSpecialtiesRepository: IUserSpecialtiesRepository,
        @inject('SpecialtiesRepository')
        private specialtiesRepository: ISpecialtiesRepository,
        @inject('UsersRepository')
        private usersRepository: IUsersRepository
    ) { }

    public async execute({ service_time, specialtie_id, user_id }: IRequest): Promise<UserSpecialtie> {
        const user = await this.usersRepository.findById(user_id);

        if (!user) {
            throw new AppError('Usuário não encontrado');
        }

        if (user.type !== 'therapist') {
            throw new AppError('Usuário não é terapeuta');
        }

        const specialtie = await this.specialtiesRepository.findById(specialtie_id);

        if (!specialtie) {
            throw new AppError('Especialidade não cadastrada');
        }

        const existsSpecialtieInUser = await this.userSpecialtiesRepository.findSpecialtieInUser({ specialtie_id, user_id });

        if (existsSpecialtieInUser) {
            throw new AppError('Especialidade já cadastrada para o terapeuta');
        }

        const serviceTimeSeconds = convertHourToMinutes(service_time);

        const userSpecialtie = this.userSpecialtiesRepository.create({
            specialtie_id,
            user_id,
            service_time: serviceTimeSeconds
        });

        return userSpecialtie;
    }
}

export default CreateUserSpecialtieServices;