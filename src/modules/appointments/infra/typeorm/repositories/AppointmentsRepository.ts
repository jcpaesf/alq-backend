import { Repository, getRepository, Raw } from 'typeorm';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import Appointment from '../entities/Appointment';
import IFindTherapistAppointmentsDTO from '@modules/appointments/dtos/IFindTherapistAppointmentsDTO';
import IFindAllAppointmentsDTO from '@modules/appointments/dtos/IFindAllAppointmentsDTO';
import IReturnAllAppointmentsDTO from '@modules/appointments/dtos/IReturnAllAppointmentsDTO';
import {
    getDate,
    getMonth,
    getYear,
    getHours,
    getMinutes,
    format
} from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface IAppointment extends Appointment {
    therapist_name: string;
    user_name: string;
    specialtie_name: string;
}

class AppointmentsRepository implements IAppointmentsRepository {
    private ormRepository: Repository<Appointment>;

    constructor() {
        this.ormRepository = getRepository(Appointment);
    }

    public async findAllAppointments(dto: IFindAllAppointmentsDTO): Promise<IReturnAllAppointmentsDTO> {
        const skip = dto.page > 1 ? (dto.page - 1) * 10 : 0;

        let sql = `select a.*,
                           (select u.name
                              from users u
                             where u.id = a.user_id) as user_name,
                           (select u.name
                              from users u
                             where u.id = a.therapist_id) as therapist_name,
                           (select s.description
                              from specialties s
                             where s.id = a.specialtie_id) as specialtie_name
                       from appointments a where 1 = 1`;

        if (dto.filter.therapist_name) {
            sql += ` and a.therapist_id in (select users.id
                                              from users
                                             where UPPER(users.name) like '%${dto.filter.therapist_name.toUpperCase()}%')`;
        }

        if (dto.filter.user_name) {
            sql += ` and a.user_id in (select users.id
                                         from users
                                        where UPPER(users.name) like '%${dto.filter.user_name.toUpperCase()}%')`;
        }

        if (dto.id) {
            sql += ` and a.user_id = '${dto.id}'`
        }

        if (dto.filter.specialtie_name) {
            sql += ` and a.specialtie_id in(select specialties.id
                                              from specialties
                                             where UPPER(specialties.description) like '%${dto.filter.specialtie_name.toUpperCase()}%')`
        }


        sql += ` order by a.date desc limit 10 offset ${skip}`;

        const appointments = await this.ormRepository.query(sql);

        return {
            total: appointments.length,
            appointments,
            total_pages: Math.ceil(appointments.length / 10)
        };
    }

    public async find(therapist_id: string): Promise<Appointment[]> {
        const appointments = await this.ormRepository.find({
            where: { therapist_id }
        });

        return appointments;
    }

    public async findById(id: string): Promise<Appointment | undefined> {
        const appointment = await this.ormRepository.findOne(id);

        return appointment;
    }

    public async findByDate(date: Date): Promise<Appointment[]> {
        const appointments = await this.ormRepository.find({
            where: { date }
        });

        return appointments;
    }

    public async findAppointment(date: Date, therapist_id: string): Promise<Appointment | undefined> {
        const appointment = await this.ormRepository.findOne({
            where: { date, therapist_id }
        });

        return appointment;
    }

    public async findAppointmentBetweenHours(
        initial_date: Date,
        final_date: Date,
        therapist_id: string
    ): Promise<Appointment[]> {
        const parsedIDate = format(initial_date, 'dd-MM-yyyy HH:mm', {
            locale: ptBR
        });
        const parsedFDate = format(final_date, 'dd-MM-yyyy HH:mm', {
            locale: ptBR
        });

        const appointment = await this.ormRepository.find({
            where: {
                date: Raw(dateFieldName =>
                    `to_char(${dateFieldName}, 'DD-MM-YYYY hh:MI') between '${parsedIDate}' and '${parsedFDate}'`
                ),
                therapist_id
            }
        });

        return appointment;
    }

    public async findTherapistAppointments({ therapist_id, day, month, year }: IFindTherapistAppointmentsDTO): Promise<Appointment[]> {
        const parsedDay = String(day).padStart(2, '0');
        const parsedMonth = String(month).padStart(2, '0');

        const appointments = await this.ormRepository.find({
            where: {
                therapist_id,
                date: Raw(dateFieldName =>
                    `to_char(${dateFieldName}, 'DD-MM-YYYY') = '${parsedDay}-${parsedMonth}-${year}'`
                )
            },
            relations: ['user', 'specialtie']
        });

        return appointments;
    }

    public async getTotalAppointments(): Promise<number> {
        const totalAppointments = await this.ormRepository.count();

        return totalAppointments;
    }

    public async getTotalAppointments30Days(): Promise<number> {
        const totalAppointments30Days = await this.ormRepository.count({
            where: {
                created_at: Raw(dateFieldName =>
                    `to_date(to_char(${dateFieldName}, 'DD-MM-YYYY'), 'DD-MM-YYYY') >= to_date(to_char((current_date - 30), 'DD-MM-YYYY'), 'DD-MM-YYYY')`
                )
            }
        });

        return totalAppointments30Days;
    }

    public async create(dto: ICreateAppointmentDTO): Promise<Appointment> {
        const appointment = this.ormRepository.create(dto);

        await this.ormRepository.save(appointment);

        return appointment;
    }

    public async save(appointment: Appointment): Promise<Appointment> {
        return await this.ormRepository.save(appointment);
    }
}

export default AppointmentsRepository;