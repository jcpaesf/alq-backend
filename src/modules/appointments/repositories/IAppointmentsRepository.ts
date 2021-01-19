import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO';
import IFindTherapistAppointmentsDTO from '../dtos/IFindTherapistAppointmentsDTO';
import Appointment from '../infra/typeorm/entities/Appointment';

export default interface IAppointmentsRepository {
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