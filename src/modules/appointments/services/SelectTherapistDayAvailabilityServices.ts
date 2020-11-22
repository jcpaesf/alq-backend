import { inject, injectable } from 'tsyringe';
import { getHours } from 'date-fns';
import IUserSchedulesRepository from '@modules/users/repositories/IUserSchedulesRepository';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
    therapist_id: string;
    day: number;
    month: number;
    year: number;
}

type IResponse = Array<{
    hour: number;
    available: boolean;
}>;

@injectable()
class ListTherapistDayAvailabilityServices {
    constructor(
        @inject('UserSchedulesRepository')
        private userSchedulesRepository: IUserSchedulesRepository,
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepository
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
            const endMinutesMorning = (userSchedules.length && Number(userSchedules[0].end.split(':')[1]));
            const endHourMorning = ((endMinutesMorning > 30 ? Number(userSchedules[0].end.split(':')[0]) + 1 : Number(userSchedules[0].end.split(':')[0])));

            const startHourAfternoon = (Number(userSchedules[1].start.split(':')[0]));
            const endMinutesAfternoon = (userSchedules.length && Number(userSchedules[1].end.split(':')[1]));
            const endHourAfternoon = ((endMinutesAfternoon >= 30 ? Number(userSchedules[1].end.split(':')[0]) + 1 : Number(userSchedules[1].end.split(':')[0])));

            const eachStartHour = Array.from({
                length: endHourMorning - startHourMorning
            }, (_, index) => index + startHourMorning);

            const eachEndHour = Array.from({
                length: endHourAfternoon - startHourAfternoon
            }, (_, index) => index + startHourAfternoon);

            const availableHours = [...eachStartHour, ...eachEndHour];

            const availability = availableHours.map(hour => {
                const hasAppointmentInHour = appointments.find(appointment => {
                    return getHours(appointment.date) === hour;
                });

                return {
                    hour,
                    available: !hasAppointmentInHour
                };
            });

            return availability;
        }

        return [];
    }
}

export default ListTherapistDayAvailabilityServices;