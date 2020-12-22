import { Response, Request } from 'express';
import { container } from 'tsyringe';
import SelectUserScheduleServices from '@modules/users/services/SelectUserScheduleServices';
import CreateUserScheduleServices from '@modules/users/services/CreateUserScheduleServices';
import DeleteUserScheduleServices from '@modules/users/services/DeleteUserSchedulesServices';
import UpdateUserScheduleServices from '@modules/users/services/UpdateUserScheduleServices';

export default class UserScheduleController {
    public async index(request: Request, response: Response): Promise<Response> {
        const selectUserScheduleServices = container.resolve(SelectUserScheduleServices);
        const user_id = request.user.id;
        const { year, month } = request.query;

        const userSchedules = await selectUserScheduleServices.execute({ year: Number(year), month: Number(month), user_id });

        return response.json(userSchedules);
    }

    public async create(request: Request, response: Response): Promise<Response> {
        const createUserScheduleServices = container.resolve(CreateUserScheduleServices);
        const user_id = request.user.id;
        const { service_date, start_time, end_time } = request.body;

        const userSchedule = await createUserScheduleServices.execute({
            user_id,
            service_date,
            start_time_string: start_time,
            end_time_string: end_time
        });

        return response.json(userSchedule);
    }

    public async update(request: Request, response: Response): Promise<Response> {
        const updateUserScheduleServices = container.resolve(UpdateUserScheduleServices);
        const id = request.params.id;
        const { start_time, end_time } = request.body;

        const userSchedule = await updateUserScheduleServices.execute({ id, start_time_string: start_time, end_time_string: end_time });

        return response.json(userSchedule);
    }

    public async delete(request: Request, response: Response): Promise<Response> {
        const deleteUserScheduleServices = container.resolve(DeleteUserScheduleServices);
        const user_id = request.user.id;
        const id = request.params.id;

        await deleteUserScheduleServices.execute({ id, user_id });

        return response.status(204).json();
    }
}