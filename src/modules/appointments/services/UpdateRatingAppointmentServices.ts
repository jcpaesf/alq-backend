import { inject, injectable } from 'tsyringe';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
    user_id: string;
    appointment_id: string;
    rating: number;
}

@injectable()
class UpdateRatingAppointmentServices {
    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepository,
        @inject('UsersRepository')
        private usersRepository: IUsersRepository
    ) { }

    public async execute({ user_id, appointment_id, rating }: IRequest): Promise<void> {
        const user = await this.usersRepository.findById(user_id);

        if (!user) throw new AppError('Usuário não encontrado');

        if (user.type !== 'user') throw new AppError('Apenas clientes podem avaliar o atendimento');

        const appointment = await this.appointmentsRepository.findById(appointment_id);

        if (!appointment) throw new AppError('Atendimento não encontrado');

        if (user.id !== appointment.user_id) throw new AppError('Atendimento não pertence ao cliente informado');

        if (!appointment.rating) appointment.rating = rating;

        await this.appointmentsRepository.save(appointment);
    }
}

export default UpdateRatingAppointmentServices;