import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

interface IResponse {
    total_users: number;
    total_user_30_days: number;
    total_therapists: number;
    total_therapists_30_days: number;
    total_appointments: number;
    total_appointments_30_days: number;
    total_therapists_analyzing: number;
    total_therapists_analyzing_7_days: number;
}

@injectable()
class DashboardServices {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepository
    ) { }

    public async execute(user_id: string): Promise<IResponse> {
        const user = await this.usersRepository.findById(user_id);

        if (!user) {
            throw new AppError('Usuário não encontrado');
        }

        if (user.type !== 'admin') {
            throw new AppError('Usuário não é administrador');
        }

        const total_users = await this.usersRepository.getTotalUsers();
        const total_user_30_days = await this.usersRepository.getTotalUsers30Days();
        const total_therapists = await this.usersRepository.getTotalTherapists();
        const total_therapists_30_days = await this.usersRepository.getTotalTherapists30Days();
        const total_therapists_analyzing = await this.usersRepository.getTotalTherapistsAnalyzing();
        const total_therapists_analyzing_7_days = await this.usersRepository.getTotalTherapistsAnalyzing7Days();
        const total_appointments = await this.appointmentsRepository.getTotalAppointments();
        const total_appointments_30_days = await this.appointmentsRepository.getTotalAppointments30Days();

        return {
            total_users,
            total_user_30_days,
            total_therapists,
            total_therapists_30_days,
            total_therapists_analyzing,
            total_therapists_analyzing_7_days,
            total_appointments,
            total_appointments_30_days
        }
    }
}

export default DashboardServices;