import { inject, injectable } from 'tsyringe';
import IUserSchedulesRepository from '../repositories/IUserSchedulesRepository';
import UserSchedule from '../infra/typeorm/entities/UserSchedule';
import { classToClass } from 'class-transformer';

@injectable()
class SelectUserScheduleServices {
    constructor(
        @inject('UserSchedulesRepository')
        private userSchedulesRepository: IUserSchedulesRepository
    ) { }

    public async execute(user_id: string): Promise<UserSchedule[]> {
        const userSchedules = await this.userSchedulesRepository.find(user_id);

        return classToClass(userSchedules);
    }
}

export default SelectUserScheduleServices;