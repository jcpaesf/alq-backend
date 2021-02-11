import { Request, Response } from 'express';
import { container } from 'tsyringe';
import UpdateStartCallAppointmentServices from '@modules/appointments/services/UpdateStartCallAppointmentServices';

export default class UpdateStartCallController {
    public async update(request: Request, response: Response): Promise<Response> {
        const updateStartCallAppointmentServices = container.resolve(UpdateStartCallAppointmentServices);
        const user_id = request.user.id;
        const appointment_id = request.params.id;

        await updateStartCallAppointmentServices.execute({ user_id, appointment_id });

        return response.status(204).json();
    }
}