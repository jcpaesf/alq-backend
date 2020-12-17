import { Request, Response } from 'express';
import SelectUserResumeServices from '@modules/users/services/SelectUserResumeServices';
import CreateUserResumeServices from '@modules/users/services/CreateUserResumeServices';
import DeleteUserResumeServices from '@modules/users/services/DeleteUserResumeServices';
import { container } from 'tsyringe';

export default class UserResumesController {
    public async index(request: Request, response: Response): Promise<Response> {
        const selectUserResumeServices = container.resolve(SelectUserResumeServices);
        const user_id = request.user.id;

        const userResumes = await selectUserResumeServices.execute(user_id);

        return response.json(userResumes);
    }

    public async create(request: Request, response: Response): Promise<Response> {
        const createUserResumeServices = container.resolve(CreateUserResumeServices);

        const user = await createUserResumeServices.execute({
            user_id: request.params.id,
            file: request.file.filename
        });

        return response.json(user);
    }

    public async delete(request: Request, response: Response): Promise<Response> {
        const deleteUserResumeServices = container.resolve(DeleteUserResumeServices);
        const user_id = request.user.id;
        const id = request.params.id;

        await deleteUserResumeServices.execute({ user_id, id });

        return response.status(204).json();
    }
}