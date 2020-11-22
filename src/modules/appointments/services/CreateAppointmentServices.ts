import { inject, injectable } from 'tsyringe';
import { parseISO, startOfHour } from 'date-fns';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
import Appointment from '../infra/typeorm/entities/Appointment';
import IUserSpecialtiesRepository from '@modules/users/repositories/IUserSpecialtiesRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
    therapist_id: string;
    user_id: string;
    date: string;
    specialtie_id: string;
}

@injectable()
class CreateAppointmentServices {
    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepository,
        @inject('UserSpecialtiesRepository')
        private userSpecialtiesRepository: IUserSpecialtiesRepository,
        @inject('UsersRepository')
        private usersRepository: IUsersRepository
    ) { }

    public async execute({ therapist_id, user_id, date, specialtie_id }: IRequest): Promise<Appointment> {
        const therapist = await this.usersRepository.findById(therapist_id);

        if (!therapist) {
            throw new AppError('Terapeuta não cadastrado', 400);
        }

        if (therapist.type !== 'therapist') {
            throw new AppError('Agendamento só pode ser feito com um terapeuta', 400);
        }

        const userSpecialties = await this.userSpecialtiesRepository.findByUserId(therapist_id);

        const existsSpecialties = userSpecialties.some(specialtie => {
            return specialtie.specialtie_id === specialtie_id;
        });

        if (!existsSpecialties) {
            throw new AppError('Especialidade inválida para o terapeuta', 400);
        }

        const parsedDate = startOfHour(parseISO(date));

        const existsAppointment = await this.appointmentsRepository.findAppointment(parsedDate, therapist_id);

        if (existsAppointment) {
            throw new AppError('Este horário já está agendado', 400);
        }

        const appointment = this.appointmentsRepository.create({
            therapist_id,
            user_id,
            date: parsedDate,
            specialtie_id,
            status: 'schedule'
        });

        return appointment;
    }
}

export default CreateAppointmentServices;