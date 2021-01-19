import { Request, Response } from 'express';
import { container } from 'tsyringe';
import DashboardServices from '@modules/dashboard/services/DashboardServices';

export default class DashboardController {
    public async index(request: Request, response: Response): Promise<Response> {
        const dashboardServices = container.resolve(DashboardServices);
        const user_id = request.user.id;

        const dashboard = await dashboardServices.execute(user_id);

        return response.json(dashboard);
    }
}