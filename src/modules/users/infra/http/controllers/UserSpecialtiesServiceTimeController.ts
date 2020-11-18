import { Request, Response } from 'express';
import { container } from 'tsyringe';
import UpdateServiceTimeUserSpecialtiesServices from '@modules/users/services/UpdateServiceTimeUserSpecialtiesServices';

export default class UserSpecialtiesServiceTimeController {
    public async update(request: Request, response: Response): Promise<Response> {
        const updateServiceTimeUserSpecialtiesServices = container.resolve(UpdateServiceTimeUserSpecialtiesServices);
        const dto = request.body;

        await updateServiceTimeUserSpecialtiesServices.execute({ dto });

        return response.status(204).json();
    }
}