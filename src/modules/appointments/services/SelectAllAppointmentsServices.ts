import { inject, injectable } from 'tsyringe';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

interface IRequest {
    therapist_name: string | undefined;
    user_name: string | undefined;
    initial_date: string;
    final_date: string;
    page: number;
}

interface IAppointment extends Appointment {
    therapist_name: string;
    user_name: string;
    specialtie_name: string;
}

@injectable()
class SelectAllAppointmentsServices {
    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepository
    ) { }

    public async execute({
        therapist_name,
        user_name,
        initial_date,
        final_date,
        page
    }: IRequest): Promise<IAppointment[]> {
        const appointments = await this.appointmentsRepository.findAllAppointments({
            page,
            filter: {
                therapist_name,
                user_name,
                initial_date,
                final_date
            }
        });

        return appointments;
    }
}

export default SelectAllAppointmentsServices;