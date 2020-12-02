import { Repository, getRepository, Raw } from 'typeorm';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import Appointment from '../entities/Appointment';
import IFindTherapistAppointmentsDTO from '@modules/appointments/dtos/IFindTherapistAppointmentsDTO';

class AppointmentsRepository implements IAppointmentsRepository {
    private ormRepository: Repository<Appointment>;

    constructor() {
        this.ormRepository = getRepository(Appointment);
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
        });

        return appointments;
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