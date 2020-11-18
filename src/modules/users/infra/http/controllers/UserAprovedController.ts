import { Request, Response } from 'express';
import AprovedUserServices from '@modules/users/services/AprovedUserServices';
import { container } from 'tsyringe';

export default class UserAprovedController {
    public async update(request: Request, response: Response): Promise<Response> {
        const aprovedUserServices = container.resolve(AprovedUserServices);
        const user_auth = request.user.id;
        const user_id = request.params.id;

        const user = await aprovedUserServices.execute({
            user_auth,
            user_id
        });

        return response.json(user);
    }
}