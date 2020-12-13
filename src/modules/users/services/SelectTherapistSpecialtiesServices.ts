import { inject, injectable } from 'tsyringe';
import IUserSpecialtiesRepository from '../repositories/IUserSpecialtiesRepository';;
import convertSecondsToHour from '@shared/utils/convertSecondsToHour';
import { String } from 'aws-sdk/clients/cloudsearch';

interface IResponse {
    id: string;
    description: string;
    service_time: String;
}

@injectable()
class SelectTherapistSpecialtiesServices {
    constructor(
        @inject('UserSpecialtiesRepository')
        private userSpecialtiesRepository: IUserSpecialtiesRepository
    ) { }

    public async execute(therapist_id: string): Promise<IResponse[]> {
        const userSpecialties = await this.userSpecialtiesRepository.findByUserId({ user_id: therapist_id, relations: ['specialtie'] });

        const specialties = userSpecialties.map(userSpecialtie => {
            return {
                id: userSpecialtie.specialtie_id,
                description: userSpecialtie.specialtie.description,
                service_time: convertSecondsToHour(userSpecialtie.service_time)
            }
        });

        return specialties;
    }
}

export default SelectTherapistSpecialtiesServices;