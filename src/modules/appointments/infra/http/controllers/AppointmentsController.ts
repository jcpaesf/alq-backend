import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateAppointmentServices from '@modules/appointments/services/CreateAppointmentServices';

export default class AppointmentsController {
    public async create(request: Request, response: Response): Promise<Response> {
        const createAppointmentServices = container.resolve(CreateAppointmentServices);
        const user_id = request.user.id;
        const { therapist_id, date, specialtie_id } = request.body;

        const appointment = await createAppointmentServices.execute({
            therapist_id,
            user_id,
            date,
            specialtie_id
        });

        return response.json(appointment);
    }
}