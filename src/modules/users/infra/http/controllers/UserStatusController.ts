import { container } from 'tsyringe';
import { Request, Response } from 'express';
import UpdateUserStatusServices from '@modules/users/services/UpdateUserStatusServices';

export default class UserStatusController {
    public async update(request: Request, response: Response): Promise<Response> {
        const updateuserStatusServices = container.resolve(UpdateUserStatusServices);
        const user_auth_id = request.user.id;
        const therapist_id = request.params.id;
        const { status } = request.body;

        await updateuserStatusServices.execute({ user_auth_id, therapist_id, status });

        return response.status(204).json();
    }
}