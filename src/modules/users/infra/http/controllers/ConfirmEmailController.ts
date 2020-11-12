import { Request, Response } from 'express';
import ConfirmEmailUserServices from '@modules/users/services/ConfirmEmailUserServices';
import { container } from 'tsyringe';

export default class ConfirmEmailController {
    public async update(request: Request, response: Response): Promise<Response> {
        const { email, token } = request.body;

        const confirmEmailUser = container.resolve(ConfirmEmailUserServices);

        await confirmEmailUser.execute({ email, token });

        return response.status(204).json();
    }
}