import { Request, Response } from 'express';
import { container } from 'tsyringe';
import UpdateRatingAppointmentServices from '@modules/appointments/services/UpdateRatingAppointmentServices';

export default class UpdateRatingController {
    public async update(request: Request, response: Response): Promise<Response> {
        const updateRatingAppointmentServices = container.resolve(UpdateRatingAppointmentServices);
        const user_id = request.user.id;
        const appointment_id = request.params.id;
        const { rating } = request.body;

        await updateRatingAppointmentServices.execute({ user_id, appointment_id, rating });

        return response.status(204).json();
    }
}