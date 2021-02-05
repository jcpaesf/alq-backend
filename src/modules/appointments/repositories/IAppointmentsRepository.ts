import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO';
import IFindTherapistAppointmentsDTO from '../dtos/IFindTherapistAppointmentsDTO';
import IFindAllAppointmentsDTO from '../dtos/IFindAllAppointmentsDTO';
import IReturnAllAppointmentsDTO from '../dtos/IReturnAllAppointmentsDTO';
import Appointment from '../infra/typeorm/entities/Appointment';

interface IAppointment extends Appointment {
    therapist_name: string;
    user_name: string;
    specialtie_name: string;
}

export default interface IAppointmentsRepository {
    findAllAppointments(dto: IFindAllAppointmentsDTO): Promise<IReturnAllAppointmentsDTO>;
    find(therapist_id: string): Promise<Appointment[]>;
    findById(id: string): Promise<Appointment | undefined>;
    findByDate(date: Date): Promise<Appointment[]>;
    findAppointment(date: Date, therapist_id: string): Promise<Appointment | undefined>;
    findTherapistAppointments(dto: IFindTherapistAppointmentsDTO): Promise<Appointment[]>;
    getTotalAppointments(): Promise<number>;
    getTotalAppointments30Days(): Promise<number>;
    create(dto: ICreateAppointmentDTO): Promise<Appointment>;
    save(appointment: Appointment): Promise<Appointment>;
}