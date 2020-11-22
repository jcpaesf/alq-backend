import { Repository, getRepository, Raw } from 'typeorm';
import IUserSchedulesRepository from '@modules/users/repositories/IUserSchedulesRepository';
import ICreateUserScheduleDTO from '@modules/users/dtos/ICreateUserScheduleDTO';
import IFindAllMonthFromTherapistDTO from '@modules/appointments/dtos/IFindAllMonthFromTherapistDTO';
import UserSchedule from '../entities/UserSchedule';
import IFindAllDayFromTherapistDTO from '@modules/appointments/dtos/IFindAllDayFromTherapistDTO';

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

    public async findAllMonthFromTherapist({ therapist_id, month, year }: IFindAllMonthFromTherapistDTO): Promise<UserSchedule[]> {
        const parsedMonth = String(month).padStart(2, '0');

        const userSchedules = await this.ormRepository.find({
            where: {
                user_id: therapist_id,
                service_date: Raw(dateFieldName =>
                    `to_char(${dateFieldName}, 'MM-YYYY') = '${parsedMonth}-${year}'`
                )
            }
        });

        return userSchedules;
    }

    public async findAllDayFromTherapist({ therapist_id, day, month, year }: IFindAllDayFromTherapistDTO): Promise<UserSchedule[]> {
        const parsedDay = String(day).padStart(2, '0');
        const parsedMonth = String(month).padStart(2, '0');

        const userSchedules = await this.ormRepository.find({
            where: {
                user_id: therapist_id,
                service_date: Raw(dateFieldName =>
                    `to_char(${dateFieldName}, 'DD-MM-YYYY') = '${parsedDay}-${parsedMonth}-${year}'`
                )
            },
            order: {
                start_time: 'ASC'
            }
        });

        return userSchedules;
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