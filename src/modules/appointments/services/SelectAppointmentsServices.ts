import { inject, injectable } from 'tsyringe';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
    therapist_id: string;
    year: number;
    month: number;
    day: number;
}

interface IResponse {
    id: string;
    date: Date;
    specialtie_id: string;
    specialtie_name: string;
    user_id: string;
    user_name: string;
}

@injectable()
class SelectAppointmentsServices {
    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepository
    ) { }

    public async execute({ therapist_id, year, month, day }: IRequest): Promise<IResponse[]> {
        const appointments = await this.appointmentsRepository.findTherapistAppointments({ day, month, year, therapist_id });

        const response = appointments.map(appointment => {
            return {
                id: appointment.id,
                date: appointment.date,
                specialtie_id: appointment.specialtie_id,
                specialtie_name: appointment.specialtie.description,
                user_id: appointment.user_id,
                user_name: appointment.user.name,
                online: appointment.online
            }
        });

        return response;
    }
}

export default SelectAppointmentsServices;