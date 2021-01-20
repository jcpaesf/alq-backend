import { Request, Response } from 'express';
import SpecialtieServices from '@modules/users/services/SpecialtieServices';
import { container } from 'tsyringe';

export default class SpecialtiesController {
    public async index(request: Request, response: Response): Promise<Response> {
        const specialtie_id = request.params.id;
        const specialtieServices = container.resolve(SpecialtieServices);
        const { page } = request.query;

        const specialtie = await specialtieServices.index({ id: specialtie_id, page: Number(page) });

        return response.json(specialtie);
    }

    public async update(request: Request, response: Response): Promise<Response> {
        const specialtieServices = container.resolve(SpecialtieServices);
        const auth_user = request.user.id;
        const id = request.params.id;
        const { description, active } = request.body;

        const specialtie = await specialtieServices.update({ id, description, active }, auth_user);

        return response.json(specialtie);
    }

    public async create(request: Request, response: Response): Promise<Response> {
        const specialtieServices = container.resolve(SpecialtieServices);
        const auth_user = request.user.id;
        const { description, active } = request.body;

        const specialtie = await specialtieServices.execute({ description, active }, auth_user);

        return response.json(specialtie);
    }

    public async delete(request: Request, response: Response): Promise<Response> {
        const specialtieServices = container.resolve(SpecialtieServices);
        const auth_user = request.user.id;
        const id = request.params.id;

        await specialtieServices.delete({ auth_user, id });

        return response.status(204).json();
    }
}