import { inject, injectable } from 'tsyringe';
import { parseISO, startOfDay } from 'date-fns';
import IUserSchedulesRepository from '../repositories/IUserSchedulesRepository';
import UserSchedule from '../infra/typeorm/entities/UserSchedule';
import convertHourToMinutes from '@shared/utils/convertHourToMinutes';
import AppError from '@shared/errors/AppError';
import { classToClass } from 'class-transformer';

interface IRequest {
    user_id: string;
    service_date: string;
    start_time_string: string;
    end_time_string: string;
}

@injectable()
class CreateUserScheduleServices {
    constructor(
        @inject('UserSchedulesRepository')
        private userSchedulesRepository: IUserSchedulesRepository
    ) { }

    public async execute({
        user_id,
        service_date,
        start_time_string,
        end_time_string
    }: IRequest): Promise<UserSchedule> {
        let userSchedule;
        const start_time = convertHourToMinutes(start_time_string);
        const end_time = convertHourToMinutes(end_time_string);
        const parsedServiceDate = parseISO(service_date);
        const userScheduleServiceDate = startOfDay(parsedServiceDate);
        const userScheduleDate = await this.userSchedulesRepository.findByServiceDate(userScheduleServiceDate);

        if (!userScheduleDate.length) {
            userSchedule = await this.userSchedulesRepository.create({
                user_id,
                service_date: userScheduleServiceDate,
                start_time,
                end_time,
                start: start_time_string,
                end: end_time_string
            });
        } else {
            for (const scheduleDate of userScheduleDate) {
                if ((start_time >= scheduleDate.start_time && start_time <= scheduleDate.end_time) ||
                    (end_time >= scheduleDate.start_time && end_time <= scheduleDate.end_time)) {
                    throw new AppError('Horário de atendimento inválido');
                }

                if ((scheduleDate.start_time >= start_time && scheduleDate.start_time <= end_time) ||
                    (scheduleDate.start_time >= end_time && scheduleDate.end_time <= end_time)) {
                    throw new AppError('Horário de atendimento inválido');
                }
            }

            userSchedule = await this.userSchedulesRepository.create({
                user_id,
                service_date: userScheduleServiceDate,
                start_time,
                end_time,
                start: start_time_string,
                end: end_time_string
            });
        }

        return classToClass(userSchedule);
    }
}

export default CreateUserScheduleServices;