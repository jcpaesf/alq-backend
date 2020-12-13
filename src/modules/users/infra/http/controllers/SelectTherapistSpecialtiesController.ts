import { Request, Response } from 'express';
import { container } from 'tsyringe';
import SelectTherapistSpecialtiesServices from '@modules/users/services/SelectTherapistSpecialtiesServices';

export default class SelectTherapistSpecialtiesController {
    public async index(request: Request, response: Response): Promise<Response> {
        const selectTherapistServices = container.resolve(SelectTherapistSpecialtiesServices);
        const therapist_id = request.params.id;

        const specialties = await selectTherapistServices.execute(therapist_id);

        return response.json(specialties);
    }
}