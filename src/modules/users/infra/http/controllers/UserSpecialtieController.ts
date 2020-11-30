import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateUserSpecialtieServices from '@modules/users/services/CreateUserSpecialtieServices';

export default class UserSpecialtieController {
    public async create(request: Request, response: Response): Promise<Response> {
        const createUserSpecialtieServices = container.resolve(CreateUserSpecialtieServices);
        const { specialtie_id, service_time } = request.body;
        const user_id = request.user.id;

        const userSpecialtie = await createUserSpecialtieServices.execute({ specialtie_id, service_time, user_id });

        return response.json(userSpecialtie);
    }
}