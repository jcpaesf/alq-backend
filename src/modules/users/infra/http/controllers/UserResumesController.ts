import { Request, Response } from 'express';
import CreateUserResumeServices from '@modules/users/services/CreateUserResumeServices';
import { container } from 'tsyringe';

export default class UserResumesController {
    public async create(request: Request, response: Response): Promise<Response> {
        const createUserResumeServices = container.resolve(CreateUserResumeServices);

        const user = await createUserResumeServices.execute({
            user_id: request.params.id,
            file: request.file.filename
        });

        return response.json(user);
    }
}