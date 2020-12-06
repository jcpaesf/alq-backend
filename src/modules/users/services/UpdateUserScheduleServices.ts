import { inject, injectable } from 'tsyringe';
import IUserSchedulesRepository from '../repositories/IUserSchedulesRepository';
import UserSchedule from '../infra/typeorm/entities/UserSchedule';
import convertHourToMinutes from '@shared/utils/convertHourToMinutes';
import AppError from '@shared/errors/AppError';
import { classToClass } from 'class-transformer';

interface IRequest {
    id: string;
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
        id,
        start_time_string,
        end_time_string
    }: IRequest): Promise<UserSchedule> {
        const userSchedule = await this.userSchedulesRepository.findById(id);

        if (!userSchedule) {
            throw new AppError('Agenda não encontrada');
        }

        const start_time = convertHourToMinutes(start_time_string);
        const end_time = convertHourToMinutes(end_time_string);
        const userScheduleDate = await this.userSchedulesRepository.findByServiceDate(userSchedule.service_date);

        for (const scheduleDate of userScheduleDate) {
            if (scheduleDate.id !== id) {
                if ((start_time >= scheduleDate.start_time && start_time <= scheduleDate.end_time) ||
                    (end_time >= scheduleDate.start_time && end_time <= scheduleDate.end_time)) {
                    throw new AppError('Horário de atendimento inválido');
                }

                if ((scheduleDate.start_time >= start_time && scheduleDate.start_time <= end_time) ||
                    (scheduleDate.start_time >= end_time && scheduleDate.end_time <= end_time)) {
                    throw new AppError('Horário de atendimento inválido');
                }
            }
        }

        userSchedule.start_time = start_time;
        userSchedule.end_time = end_time;
        userSchedule.start = start_time_string;
        userSchedule.end = end_time_string;

        await this.userSchedulesRepository.save(userSchedule);

        return classToClass(userSchedule);
    }
}

export default CreateUserScheduleServices;