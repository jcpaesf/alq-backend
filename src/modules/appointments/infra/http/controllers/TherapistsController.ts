import { Request, Response } from 'express';
import { container } from 'tsyringe';
import SelectTherapistServices from '@modules/appointments/services/SelectTherapistServices';

export default class TherapistsController {
    public async index(request: Request, response: Response): Promise<Response> {
        const selectTherapistServices = container.resolve(SelectTherapistServices);

        const therapists = await selectTherapistServices.execute();

        return response.json(therapists);
    }
}