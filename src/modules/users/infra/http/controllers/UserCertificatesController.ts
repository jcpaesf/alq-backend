import { Request, Response } from 'express';
import SelectUserCertificateServices from '@modules/users/services/SelectUserCertificateServices';
import CreateUserCertificateServices from '@modules/users/services/CreateUserCertificateServices';
import DeleteUserCertificateServices from '@modules/users/services/DeleteUserCertificateServices';
import { container } from 'tsyringe';

export default class UserCertificatesController {
    public async index(request: Request, response: Response): Promise<Response> {
        const selectUserCertificateServices = container.resolve(SelectUserCertificateServices);
        const user_id = request.user.id;

        const userCertificates = await selectUserCertificateServices.execute(user_id);

        return response.json(userCertificates);
    }

    public async create(request: Request, response: Response): Promise<Response> {
        const createUserCertificateServices = container.resolve(CreateUserCertificateServices);

        const user = await createUserCertificateServices.execute({
            user_id: request.params.id,
            file: request.file.filename
        });

        return response.json(user);
    }

    public async delete(request: Request, response: Response): Promise<Response> {
        const deleteUserCertificateServices = container.resolve(DeleteUserCertificateServices);
        const user_id = request.user.id;
        const id = request.params.id;

        await deleteUserCertificateServices.execute({ user_id, id });

        return response.status(204).json();
    }
}