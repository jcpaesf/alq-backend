import { Request, Response } from 'express';
import CreateUserCertificateServices from '@modules/users/services/CreateUserCertificateServices';
import { container } from 'tsyringe';

export default class UserCertificatesController {
    public async create(request: Request, response: Response): Promise<Response> {
        const createUserCertificateServices = container.resolve(CreateUserCertificateServices);

        const user = await createUserCertificateServices.execute({
            user_id: request.params.id,
            file: request.file.filename
        });

        return response.json(user);
    }
}