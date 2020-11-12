import { Request, Response } from 'express';
import UpdateUserAvatarServices from '@modules/users/services/UpdateUserAvatarServices';
import { container } from 'tsyringe';

export default class UserAprovedController {
    public async update(request: Request, response: Response): Promise<Response> {
        const updateUserAvatarServices = container.resolve(UpdateUserAvatarServices);

        const user = await updateUserAvatarServices.execute({
            id: request.params.id,
            avatar: request.file.filename
        });

        return response.json(user);
    }
}