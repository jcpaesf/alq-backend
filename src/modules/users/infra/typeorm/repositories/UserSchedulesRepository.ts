import { Repository, getRepository } from 'typeorm';
import IUserSchedulesRepository from '@modules/users/repositories/IUserSchedulesRepository';
import ICreateUserScheduleDTO from '@modules/users/dtos/ICreateUserScheduleDTO';
import UserSchedule from '../entities/UserSchedule';

class UserSchedulesRepository implements IUserSchedulesRepository {
    private ormRepository: Repository<UserSchedule>;

    constructor() {
        this.ormRepository = getRepository(UserSchedule);
    }

    public async find(user_id: string): Promise<UserSchedule[]> {
        const userSchedules = await this.ormRepository.find({
            where: { user_id }
        });

        return userSchedules;
    }

    public async findById(id: string): Promise<UserSchedule | undefined> {
        const userSchedule = await this.ormRepository.findOne(id);

        return userSchedule;
    }

    public async findByServiceDate(service_date: Date): Promise<UserSchedule[]> {
        const userSchedule = await this.ormRepository.find({
            where: { service_date }
        });

        return userSchedule;
    }

    public async create(dto: ICreateUserScheduleDTO): Promise<UserSchedule> {
        const userSchedule = this.ormRepository.create(dto);

        await this.ormRepository.save(userSchedule);

        return userSchedule;
    }

    public async save(userSchedule: UserSchedule): Promise<UserSchedule> {
        return await this.ormRepository.save(userSchedule);
    }
}

export default UserSchedulesRepository;