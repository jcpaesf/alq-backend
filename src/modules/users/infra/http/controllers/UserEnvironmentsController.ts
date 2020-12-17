import { Request, Response } from 'express';
import SelectUserEnvironmentServices from '@modules/users/services/SelectUserEnvironmentServices';
import CreateUserEnvironmentServices from '@modules/users/services/CreateUserEnvironmentServices';
import DeleteUserEnvironmentServices from '@modules/users/services/DeleteUserEnvironmentServices';
import { container } from 'tsyringe';

export default class UserEnvironmentsController {
    public async index(request: Request, response: Response): Promise<Response> {
        const selectUserEnvironmentServices = container.resolve(SelectUserEnvironmentServices);
        const user_id = request.user.id;

        const userEnvironments = await selectUserEnvironmentServices.execute(user_id);

        return response.json(userEnvironments);
    }

    public async create(request: Request, response: Response): Promise<Response> {
        const createUserEnvironmentServices = container.resolve(CreateUserEnvironmentServices);

        const user = await createUserEnvironmentServices.execute({
            user_id: request.params.id,
            file: request.file.filename
        });

        return response.json(user);
    }

    public async delete(request: Request, response: Response): Promise<Response> {
        const deleteUserEnvironmentServices = container.resolve(DeleteUserEnvironmentServices);
        const user_id = request.user.id;
        const id = request.params.id;

        await deleteUserEnvironmentServices.execute({ user_id, id });

        return response.status(204).json();
    }
}