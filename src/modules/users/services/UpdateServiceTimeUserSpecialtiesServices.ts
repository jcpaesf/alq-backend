import { inject, injectable } from 'tsyringe';
import IUserSpecialtiesRepository from '../repositories/IUserSpecialtiesRepository';
import AppError from '@shared/errors/AppError';
import convertHourToMinutes from '@shared/utils/convertHourToMinutes';

interface IUserSpecialties {
    id: string;
    time: string;
}

interface IRequest {
    dto: IUserSpecialties[]
}

@injectable()
class UpdateServiceTimeUserSpecialtiesServices {
    constructor(
        @inject('UserSpecialtiesRepository')
        private userSpecialtiesRepository: IUserSpecialtiesRepository
    ) { }

    public async execute({ dto }: IRequest): Promise<void> {
        for (const specialtie of dto) {
            const userSpecialtie = await this.userSpecialtiesRepository.findById(specialtie.id);

            if (!userSpecialtie) {
                throw new AppError('Especialidade não encontrada');
            }

            const service_time = convertHourToMinutes(specialtie.time);

            userSpecialtie.service_time = service_time;

            await this.userSpecialtiesRepository.save(userSpecialtie);
        }
    }
}

export default UpdateServiceTimeUserSpecialtiesServices;