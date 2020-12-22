import { inject, injectable } from 'tsyringe';
import { addMinutes, getHours, getMinutes } from 'date-fns';
import IUserSchedulesRepository from '@modules/users/repositories/IUserSchedulesRepository';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
import moment, { Moment } from 'moment';
import IUserSpecialtiesRepository from '@modules/users/repositories/IUserSpecialtiesRepository';

interface IRequest {
    therapist_id: string;
    day: number;
    month: number;
    year: number;
}

type IResponse = Array<{
    hour: string;
    available: boolean;
}>;

@injectable()
class ListTherapistDayAvailabilityServices {
    constructor(
        @inject('UserSchedulesRepository')
        private userSchedulesRepository: IUserSchedulesRepository,
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepository,
        @inject('UserSpecialtiesRepository')
        private userSpecialtiesRepository: IUserSpecialtiesRepository
    ) { }

    public async execute({ therapist_id, day, month, year }: IRequest): Promise<IResponse> {
        const availabilityHours: IResponse = [];
        const hoursAvailable: string[] = [];
        
        const userSchedules = await this.userSchedulesRepository.findAllDayFromTherapist({
            therapist_id,
            day,
            month,
            year
        });

        if (userSchedules.length) {
            const appointments = await this.appointmentsRepository.findTherapistAppointments({
                therapist_id,
                day,
                month,
                year
            });

            const hoursAppointments = appointments.map(appointment => {
                const hourAppointment = getHours(appointment.date);
                const minutesAppointment = getMinutes(appointment.date);

                return {
                    hour: hourAppointment.toString().padStart(2, '0') + ':' + minutesAppointment.toString().padStart(2, '0'),
                    specialtie_id: appointment.specialtie_id,
                    therapist_id: appointment.therapist_id,
                    date: appointment.date
                }
            });

            for (const userSchedule of userSchedules) {
                const startHour = (Number(userSchedule.start.split(':')[0]));
                const startMinutes = (Number(userSchedule.start.split(':')[1]));
                const endHour = Number(userSchedule.end.split(':')[0]);
                const endMinutes = Number(userSchedule.end.split(':')[1]);

                let dateMoment: Moment;
                let dateMomentMinutes: Moment;

                for (let hour = startHour; hour < (endMinutes > 0 ? endHour + 1 : endHour); hour++) {
                    dateMoment = moment().hour(hour).minute(startMinutes > 0 ? startMinutes : 0);
                    dateMomentMinutes = moment().hour(hour).minute(startMinutes > 0 ? 0 : 30);

                    if (startMinutes > 0) dateMomentMinutes = moment().hour(hour + 1).minute(0);

                    hoursAvailable.push(moment(dateMoment).format("HH:mm"));
                    hoursAvailable.push(moment(dateMomentMinutes).format("HH:mm"));
                }

                if (startMinutes > 0) hoursAvailable.pop();
                if (endMinutes > 0) hoursAvailable.pop();
            }

            for (const hourAppointment of hoursAppointments) {
                const serviceTimeSpecialtie = await this.userSpecialtiesRepository.getTimeSpecialtie({ user_id: hourAppointment.therapist_id, specialtie_id: hourAppointment.specialtie_id });
                const finalAppointmentHour = addMinutes(hourAppointment.date, serviceTimeSpecialtie);
                const finalHour = getHours(finalAppointmentHour);
                const finalMinutes = getMinutes(finalAppointmentHour);
                const stringFinalHour = finalHour.toString().padStart(2, '0') + ':' + finalMinutes.toString().padStart(2, '0');

                for (const hour of hoursAvailable) {
                    const hourAvailable = hour === hourAppointment.hour || hour <= stringFinalHour && hour >= hourAppointment.hour;

                    if (hourAvailable) {
                        availabilityHours.push({ hour, available: !hourAvailable });
                    }
                }
            }

            for (const hour of hoursAvailable) {
                const haveHour = availabilityHours.some(availabilityHour => {
                    return availabilityHour.hour === hour;
                });

                if (!haveHour) {
                    availabilityHours.push({ hour, available: true });
                }
            }

            return availabilityHours.sort((appointmentA, appointmentB) => {
                if (appointmentA.hour < appointmentB.hour) {
                    return -1;
                }

                return 0;
            });
        }

        return [];
    }
}

export default ListTherapistDayAvailabilityServices;