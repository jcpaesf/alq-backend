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

            const startHourMorning = (Number(userSchedules[0].start.split(':')[0]));
            const startMinutesMorning = (Number(userSchedules[0].start.split(':')[1]));
            const endHourMorning = Number(userSchedules[0].end.split(':')[0]);
            const endMinutesMorning = Number(userSchedules[0].end.split(':')[1]);
            const startHourAfternoon = (Number(userSchedules[1].start.split(':')[0]));
            const startMinutesAfternoon = (Number(userSchedules[1].start.split(':')[1]));
            const endHourAfternoon = Number(userSchedules[1].end.split(':')[0]);
            const endMinutesAfternoon = Number(userSchedules[1].end.split(':')[1]);

            const hoursAvailable: string[] = [];
            let dateMoment: Moment;
            let dateMomentMinutes: Moment;

            for (let hourMorning = startHourMorning; hourMorning < (endMinutesMorning > 0 ? endHourMorning + 1 : endHourMorning); hourMorning++) {
                dateMoment = moment().hour(hourMorning).minute(startMinutesMorning > 0 ? startMinutesMorning : 0);
                dateMomentMinutes = moment().hour(hourMorning).minute(startMinutesMorning > 0 ? 0 : 30);

                if (startMinutesMorning > 0) dateMomentMinutes = moment().hour(hourMorning + 1).minute(0);

                hoursAvailable.push(moment(dateMoment).format("HH:mm"));
                hoursAvailable.push(moment(dateMomentMinutes).format("HH:mm"));
            }

            if (startMinutesMorning > 0) hoursAvailable.pop();
            if (endMinutesMorning > 0) hoursAvailable.pop();

            for (let hourAfternoon = startHourAfternoon; hourAfternoon < (endMinutesAfternoon > 0 ? endHourAfternoon + 1 : endHourAfternoon); hourAfternoon++) {
                dateMoment = moment().hour(hourAfternoon).minute(startMinutesAfternoon > 0 ? startMinutesAfternoon : 0);
                dateMomentMinutes = moment().hour(hourAfternoon).minute(startMinutesAfternoon > 0 ? 0 : 30);

                if (startMinutesAfternoon > 0) dateMomentMinutes = moment().hour(hourAfternoon + 1).minute(0);

                hoursAvailable.push(moment(dateMoment).format("HH:mm"));
                hoursAvailable.push(moment(dateMomentMinutes).format("HH:mm"));
            }

            if (startMinutesAfternoon > 0) hoursAvailable.pop();
            if (endMinutesAfternoon > 0) hoursAvailable.pop();

            const availabilityHours: IResponse = [];

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