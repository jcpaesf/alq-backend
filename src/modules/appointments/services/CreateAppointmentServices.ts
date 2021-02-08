import { inject, injectable } from 'tsyringe';
import {
    parseISO,
    startOfHour,
    format,
    startOfMinute,
    getDate,
    getMonth,
    getYear,
    addMinutes
} from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
import Appointment from '../infra/typeorm/entities/Appointment';
import IUserSpecialtiesRepository from '@modules/users/repositories/IUserSpecialtiesRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import IChatRoomsRepository from '../repositories/IChatRoomsRepository';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import path from 'path';
import IUserSchedulesRepository from '@modules/users/repositories/IUserSchedulesRepository';

interface IRequest {
    therapist_id: string;
    user_id: string;
    date: string;
    specialtie_id: string;
    online: boolean;
}

@injectable()
class CreateAppointmentServices {
    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepository,
        @inject('UserSpecialtiesRepository')
        private userSpecialtiesRepository: IUserSpecialtiesRepository,
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
        @inject('ChatRoomsRepository')
        private chatRoomsRepository: IChatRoomsRepository,
        @inject('MailProvider')
        private mailProvider: IMailProvider,
        @inject('UserSchedulesRepository')
        private userSchedulesRepository: IUserSchedulesRepository
    ) { }

    public async execute({
        therapist_id,
        user_id,
        date,
        specialtie_id,
        online
    }: IRequest): Promise<Appointment> {
        const therapist = await this.usersRepository.findById(therapist_id);

        if (!therapist) {
            throw new AppError('Terapeuta não cadastrado');
        }

        if (therapist.type !== 'therapist') {
            throw new AppError('Agendamento só pode ser feito com um terapeuta');
        }

        const userSpecialties = await this.userSpecialtiesRepository.findByUserId({ user_id: therapist_id, relations: [] });

        const userSpecialtie = userSpecialties.find(specialtie => {
            return specialtie.specialtie_id === specialtie_id;
        });

        if (!userSpecialtie) {
            throw new AppError('Especialidade inválida para o terapeuta');
        }

        const parsedDate = startOfMinute(parseISO(date));

        const existsAppointment = await this.appointmentsRepository.findAppointment(parsedDate, therapist_id);

        if (existsAppointment) {
            throw new AppError('Este horário já está agendado');
        }

        const userSchedules = await this.userSchedulesRepository.findAllDayFromTherapist({
            day: getDate(parsedDate),
            month: getMonth(parsedDate) + 1,
            year: getYear(parsedDate),
            therapist_id
        });

        if (!userSchedules) {
            throw new AppError('Terapeuta não atende neste dia');
        }

        const finalHourAppointment = addMinutes(parsedDate, userSpecialtie.service_time);

        const existsAppointmentInSameHour = await this.appointmentsRepository.findAppointmentBetweenHours(parsedDate, finalHourAppointment, therapist_id);

        if (existsAppointmentInSameHour.length) {
            throw new AppError('Agendamento não efetuado pois entra em conflito com outro atendimento');
        }

        const appointment = await this.appointmentsRepository.create({
            therapist_id,
            user_id,
            date: parsedDate,
            specialtie_id,
            status: 'schedule',
            online
        });

        await this.chatRoomsRepository.create({
            appointment_id: appointment.id,
            user_id,
            therapist_id
        });

        const confirmEmailTemplate = path.resolve(__dirname, '..', 'views', 'appointment.hbs');

        await this.mailProvider.sendMail({
            to: {
                name: therapist.name,
                email: therapist.email
            },
            subject: '[Alquimia do Coração] Você recebeu um novo agendamento',
            templateData: {
                file: confirmEmailTemplate,
                variables: {
                    name: therapist.name,
                    link: `${process.env.APP_WEB_URL}`,
                    date: format(parsedDate, "dd/MM/yyyy, 'às' HH:mm'h'", {
                        locale: ptBR
                    })
                }
            }
        });

        return appointment;
    }
}

export default CreateAppointmentServices;