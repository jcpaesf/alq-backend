import { Response, Request } from 'express';
import { container } from 'tsyringe';
import SelectUserScheduleServices from '@modules/users/services/SelectUserScheduleServices';
import CreateUserScheduleServices from '@modules/users/services/CreateUserScheduleServices';

export default class UserScheduleController {
    public async index(request: Request, response: Response): Promise<Response> {
        const selectUserScheduleServices = container.resolve(SelectUserScheduleServices);
        const user_id = request.user.id;

        const userSchedules = await selectUserScheduleServices.execute(user_id);

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
}