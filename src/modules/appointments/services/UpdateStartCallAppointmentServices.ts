import { inject, injectable } from 'tsyringe';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
    user_id: string;
    appointment_id: string;
}

@injectable()
class UpdateStartCallAppointmentServices {
    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepository,
        @inject('UsersRepository')
        private usersRepository: IUsersRepository
    ) { }

    public async execute({ user_id, appointment_id }: IRequest): Promise<void> {
        const user = await this.usersRepository.findById(user_id);

        if (!user) throw new AppError('Usuário não encontrado');

        const appointment = await this.appointmentsRepository.findById(appointment_id);

        if (!appointment) throw new AppError('Atendimento não encontrado');

        if (user.type === 'user' && !appointment.start_call_user) appointment.start_call_user = new Date();
        if (user.type === 'therapist' && !appointment.start_call_therapist) appointment.start_call_therapist = new Date();

        await this.appointmentsRepository.save(appointment);
    }
}

export default UpdateStartCallAppointmentServices;