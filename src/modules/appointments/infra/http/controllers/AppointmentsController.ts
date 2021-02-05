import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateAppointmentServices from '@modules/appointments/services/CreateAppointmentServices';
import SelectAppointmentsServices from '@modules/appointments/services/SelectAppointmentsServices';
import SelectAllAppointmentsServices from '@modules/appointments/services/SelectAllAppointmentsServices';

export default class AppointmentsController {
    public async index(request: Request, response: Response): Promise<Response> {
        const selectAppointmentsServices = container.resolve(SelectAppointmentsServices);
        const therapist_id = request.user.id;
        const { day, month, year } = request.query;

        const appointments = await selectAppointmentsServices.execute({
            day: Number(day),
            month: Number(month),
            year: Number(year),
            therapist_id
        });

        return response.json(appointments);
    }

    public async indexAll(request: Request, response: Response): Promise<Response> {
        const selectAppointmentsServices = container.resolve(SelectAllAppointmentsServices);
        const id = request.user.id;
        const {
            therapist_name,
            user_name,
            initial_date,
            final_date,
            page,
            specialtie_name
        } = request.query;

        const appointments = await selectAppointmentsServices.execute({
            therapist_name: therapist_name && String(therapist_name),
            user_name: user_name && String(user_name),
            initial_date: String(initial_date),
            final_date: String(final_date),
            page: Number(page),
            id,
            specialtie_name: specialtie_name && String(specialtie_name)
        });

        return response.json(appointments);
    }

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