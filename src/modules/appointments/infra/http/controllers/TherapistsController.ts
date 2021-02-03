import { Request, Response } from 'express';
import { container } from 'tsyringe';
import SelectTherapistServices from '@modules/appointments/services/SelectTherapistServices';

export default class TherapistsController {
    public async index(request: Request, response: Response): Promise<Response> {
        const selectTherapistServices = container.resolve(SelectTherapistServices);
        const { page, name, specialtie } = request.query;
        const id = request.params.id;

        const therapists = await selectTherapistServices.execute({
            id,
            page: Number(page),
            name: name && String(name),
            specialtie: specialtie && String(specialtie)
        });

        return response.json(therapists);
    }
}