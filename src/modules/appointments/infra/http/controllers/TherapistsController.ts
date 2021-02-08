import { Request, Response } from 'express';
import { container } from 'tsyringe';
import SelectTherapistServices from '@modules/appointments/services/SelectTherapistServices';

export default class TherapistsController {
    public async index(request: Request, response: Response): Promise<Response> {
        const selectTherapistServices = container.resolve(SelectTherapistServices);
        const { page, name, specialtie } = request.query;
        const id = request.params.id;
        const user_id = request.user.id;

        const therapists = await selectTherapistServices.execute({
            user_id,
            id,
            page: Number(page),
            name: name && String(name),
            specialtie: specialtie && String(specialtie)
        });

        return response.json(therapists);
    }

    public async indexSite(request: Request, response: Response): Promise<Response> {
        const {
            specialtie_id,
            city,
            online,
            presential,
            page
        } = request.query;
        const selectTherapistServices = container.resolve(SelectTherapistServices);
        
        const therapist = await selectTherapistServices.executeSite({
            specialtie_id: specialtie_id && String(specialtie_id),
            city: city && String(city),
            online: online && String(online),
            presential: presential && String(presential),
            page: page ? Number(page) : undefined
        });

        return response.json(therapist);
    }
}