import { inject, injectable } from 'tsyringe';
import IUserSchedulesRepository from '../repositories/IUserSchedulesRepository';
import UserSchedule from '../infra/typeorm/entities/UserSchedule';
import { classToClass } from 'class-transformer';

interface IRequest {
    year: number;
    month: number;
    user_id: string;
}

@injectable()
class SelectUserScheduleServices {
    constructor(
        @inject('UserSchedulesRepository')
        private userSchedulesRepository: IUserSchedulesRepository
    ) { }

    public async execute({ year, month, user_id }: IRequest): Promise<UserSchedule[]> {
        let userSchedules: UserSchedule[];

        if (year && month) {
            userSchedules = await this.userSchedulesRepository.findAllMonthFromTherapist({ month, year, therapist_id: user_id });

            return classToClass(userSchedules);
        }

        userSchedules = await this.userSchedulesRepository.find(user_id);

        return classToClass(userSchedules);
    }
}

export default SelectUserScheduleServices;