import { Request, Response } from 'express';
import SelectUserServices from '@modules/users/services/SelectUserServices';
import CreateUserServices from '@modules/users/services/CreateUserServices';
import UpdateUserServices from '@modules/users/services/UpdateUserServices';
import { container } from 'tsyringe';

export default class UsersController {
    public async index(request: Request, response: Response): Promise<Response> {
        const selectUserServices = container.resolve(SelectUserServices);
        const user_id = request.params.id;
        const user_auth = request.user.id;

        const user = await selectUserServices.execute({ user_id, user_auth });

        return response.json(user);
    }

    public async create(request: Request, response: Response): Promise<Response> {
        const createUserServices = container.resolve(CreateUserServices);

        const {
            name,
            email,
            password,
            phone,
            city,
            neighborhood,
            postal_code,
            state,
            street,
            work_presential,
            work_online,
            type,
            specialties,
            description
        } = request.body;

        const user = await createUserServices.execute({
            name,
            email,
            password,
            phone,
            city,
            neighborhood,
            postal_code,
            state,
            street,
            work_presential,
            work_online,
            type,
            specialties,
            description
        });

        return response.json(user);
    }

    public async update(request: Request, response: Response): Promise<Response> {
        const updateUserServices = container.resolve(UpdateUserServices);
        const id = request.user.id;
        const {
            name,
            email,
            phone,
            city,
            neighborhood,
            postal_code,
            state,
            street,
            work_presential,
            work_online,
            active,
            description
        } = request.body;

        const user = await updateUserServices.execute({
            id,
            name,
            email,
            phone,
            city,
            neighborhood,
            postal_code,
            state,
            street,
            work_presential,
            work_online,
            active,
            description
        });

        return response.json(user);
    }
}