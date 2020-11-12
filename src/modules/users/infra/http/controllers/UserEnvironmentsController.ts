import { Request, Response } from 'express';
import CreateUserEnvironmentServices from '@modules/users/services/CreateUserEnvironmentServices';
import { container } from 'tsyringe';

export default class UserEnvironmentsController {
    public async create(request: Request, response: Response): Promise<Response> {
        const createUserEnvironmentServices = container.resolve(CreateUserEnvironmentServices);
        
        const user = await createUserEnvironmentServices.execute({
            user_id: request.params.id,
            file: request.file.filename
        });

        return response.json(user);
    }
}