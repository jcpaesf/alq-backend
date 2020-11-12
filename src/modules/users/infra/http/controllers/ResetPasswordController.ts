import { Request, Response } from 'express';
import ResetPasswordServices from '@modules/users/services/ResetPasswordServices';
import { container } from 'tsyringe';

export default class ResetPasswordController {
    public async create(request: Request, response: Response): Promise<Response> {
        const { password, token } = request.body;

        const resetPassword = container.resolve(ResetPasswordServices);

        await resetPassword.execute({ password, token });

        return response.status(204).json();
    }
}