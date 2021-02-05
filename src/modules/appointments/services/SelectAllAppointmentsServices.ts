import { inject, injectable } from 'tsyringe';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IReturnAllAppointmentsDTO from '../dtos/IReturnAllAppointmentsDTO';

interface IRequest {
    therapist_name: string | undefined;
    user_name: string | undefined;
    specialtie_name: string | undefined;
    initial_date: string;
    final_date: string;
    page: number;
    id: string;
}

interface IAppointment extends Appointment {
    therapist_name: string;
    user_name: string;
    specialtie_name: string;
}

@injectable()
class SelectAllAppointmentsServices {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepository
    ) { }

    public async execute({
        therapist_name,
        user_name,
        initial_date,
        final_date,
        page,
        id,
        specialtie_name
    }: IRequest): Promise<IReturnAllAppointmentsDTO> {
        const user = await this.usersRepository.findById(id);

        const appointments = await this.appointmentsRepository.findAllAppointments({
            page,
            id: user ? user.type === 'admin' ? undefined : user.id : undefined,
            filter: {
                therapist_name,
                user_name,
                initial_date,
                final_date,
                specialtie_name
            }
        });

        return appointments;
    }
}

export default SelectAllAppointmentsServices;