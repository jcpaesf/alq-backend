import { Request, Response } from 'express';
import { container } from 'tsyringe';
import UpdateFinishCallAppointmentServices from '@modules/appointments/services/UpdateFinishCallAppointmentServices';

export default class UpdateFinishCallController {
    public async update(request: Request, response: Response): Promise<Response> {
        const updateFinishCallAppointmentServices = container.resolve(UpdateFinishCallAppointmentServices);
        const user_id = request.user.id;
        const appointment_id = request.params.id;

        await updateFinishCallAppointmentServices.execute({ user_id, appointment_id });

        return response.status(204).json();
    }
}