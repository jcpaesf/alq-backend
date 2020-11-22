import { inject, injectable } from 'tsyringe';
import { getDaysInMonth, getDate } from 'date-fns';
import IUserSchedulesRepository from '@modules/users/repositories/IUserSchedulesRepository';

interface IRequest {
    therapist_id: string;
    month: number;
    year: number;
}

type IResponse = Array<{
    day: number;
    available: boolean;
}>;

@injectable()
class ListTherapistMonthAvailabilityServices {
    constructor(
        @inject('UserSchedulesRepository')
        private userSchedulesRepository: IUserSchedulesRepository
    ) { }

    public async execute({ therapist_id, month, year }: IRequest): Promise<IResponse> {

        const userSchedules = await this.userSchedulesRepository.findAllMonthFromTherapist({
            therapist_id,
            month,
            year
        });

        const daysInMonth = getDaysInMonth(new Date(year, month - 1));

        const eachDayArray = Array.from(
            { length: daysInMonth },
            (_, index) => index + 1
        )

        const availableDays = eachDayArray.map(day => {
            const userScheduleInDay = userSchedules.some(schedule => {
                return getDate(schedule.service_date) === day;
            });

            return {
                day,
                available: userScheduleInDay
            }
        });

        return availableDays;
    }
}

export default ListTherapistMonthAvailabilityServices;