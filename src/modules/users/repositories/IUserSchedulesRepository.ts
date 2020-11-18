import UserSchedule from '../infra/typeorm/entities/UserSchedule';
import ICreateUserScheduleDTO from '../dtos/ICreateUserScheduleDTO';

export default interface IUserSchedulesRepository {
    find(user_id: string): Promise<UserSchedule[]>;
    findById(id: string): Promise<UserSchedule | undefined>;
    findByServiceDate(service_date: Date): Promise<UserSchedule[]>;
    create(dto: ICreateUserScheduleDTO): Promise<UserSchedule>;
    save(userSchedule: UserSchedule): Promise<UserSchedule>;
}