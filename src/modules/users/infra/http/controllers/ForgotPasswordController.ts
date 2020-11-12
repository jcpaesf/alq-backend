import { Request, Response } from 'express';
import SendForgotPasswordEmailServices from '@modules/users/services/SendForgotPasswordEmailServices';
import { container } from 'tsyringe';

export default class ForgotPasswordController {
    public async create(request: Request, response: Response): Promise<Response> {
        const { email } = request.body;

        const sendForgotPasswordEmailServices = container.resolve(SendForgotPasswordEmailServices);

        await sendForgotPasswordEmailServices.execute({ email });

        return response.status(204).json();
    }
}