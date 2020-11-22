import UserSchedule from '../infra/typeorm/entities/UserSchedule';
import ICreateUserScheduleDTO from '../dtos/ICreateUserScheduleDTO';
import IFindAllMonthFromTherapistDTO from '@modules/appointments/dtos/IFindAllMonthFromTherapistDTO';
import IFindAllDayFromTherapistDTO from '@modules/appointments/dtos/IFindAllDayFromTherapistDTO';

export default interface IUserSchedulesRepository {
    find(user_id: string): Promise<UserSchedule[]>;
    findById(id: string): Promise<UserSchedule | undefined>;
    findByServiceDate(service_date: Date): Promise<UserSchedule[]>;
    findAllMonthFromTherapist(dto: IFindAllMonthFromTherapistDTO): Promise<UserSchedule[]>;
    findAllDayFromTherapist(dto: IFindAllDayFromTherapistDTO): Promise<UserSchedule[]>;
    create(dto: ICreateUserScheduleDTO): Promise<UserSchedule>;
    save(userSchedule: UserSchedule): Promise<UserSchedule>;
}