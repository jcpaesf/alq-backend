import { Request, Response } from 'express';
import { container } from 'tsyringe';
import SelectTherapistMonthAvailabilityServices from '@modules/appointments/services/SelectTherapistMonthAvailabilityServices';

export default class MonthAvailabilityController {
    public async index(request: Request, response: Response): Promise<Response> {
        const selectTherapistMonthAvailabilityServices = container.resolve(SelectTherapistMonthAvailabilityServices);
        const therapist_id = request.params.id;
        const { year, month } = request.query;

        const therapistMonthAvailability = await selectTherapistMonthAvailabilityServices.execute({
            therapist_id,
            year: Number(year),
            month: Number(month)
        });

        return response.json(therapistMonthAvailability);
    }
}