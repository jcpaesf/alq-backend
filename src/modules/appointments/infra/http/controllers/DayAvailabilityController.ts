import { Request, Response } from 'express';
import { container } from 'tsyringe';
import SelectTherapistDayAvailabilityServices from '@modules/appointments/services/SelectTherapistDayAvailabilityServices';

export default class DayAvailabilityController {
    public async index(request: Request, response: Response): Promise<Response> {
        const selectTherapistDayAvailabilityServices = container.resolve(SelectTherapistDayAvailabilityServices);
        const therapist_id = request.params.id;
        const { day, year, month } = request.query;

        const therapistDayAvailability = await selectTherapistDayAvailabilityServices.execute({
            therapist_id,
            day: Number(day),
            year: Number(year),
            month: Number(month)
        });

        return response.json(therapistDayAvailability);
    }
}