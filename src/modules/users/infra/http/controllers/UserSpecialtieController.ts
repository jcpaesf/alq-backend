import { Request, Response } from 'express';
import { container } from 'tsyringe';
import SelectUserSpecialtiesServices from '@modules/users/services/SelectUserSpecialtiesServices';
import CreateUserSpecialtieServices from '@modules/users/services/CreateUserSpecialtieServices';
import DeleteUserSpecialtiesServices from '@modules/users/services/DeleteUserSpecialtiesServices';

export default class UserSpecialtieController {
    public async index(request: Request, response: Response): Promise<Response> {
        const selectUserSpecialtiesServices = container.resolve(SelectUserSpecialtiesServices);
        const user_id = request.user.id;

        const userSpecialties = await selectUserSpecialtiesServices.execute(user_id);

        return response.json(userSpecialties);
    }

    public async create(request: Request, response: Response): Promise<Response> {
        const createUserSpecialtieServices = container.resolve(CreateUserSpecialtieServices);
        const { specialtie_id, service_time } = request.body;
        const user_id = request.user.id;

        const userSpecialtie = await createUserSpecialtieServices.execute({ specialtie_id, service_time, user_id });

        return response.json(userSpecialtie);
    }

    public async delete(request: Request, response: Response): Promise<Response> {
        const deleteUserSpecialtiesServices = container.resolve(DeleteUserSpecialtiesServices);
        const user_id = request.user.id;
        const id = request.params.id;

        await deleteUserSpecialtiesServices.execute({ id, user_id });

        return response.status(204).json();
    }
}