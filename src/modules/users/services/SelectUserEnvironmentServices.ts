import { inject, injectable } from 'tsyringe';
import UserEnvironment from '../infra/typeorm/entities/UserEnvironment';
import IUserEnvironmentsRepository from '../repositories/IUserEnvironmentsRepository';
import { classToClass } from 'class-transformer'

@injectable()
class SelectUserEnvironmentServices {
    constructor(
        @inject('UserEnvironmentsRepository')
        private userEnvironmentsRepository: IUserEnvironmentsRepository
    ) { }

    public async execute(user_id: string): Promise<UserEnvironment[]> {
        const userEnvironments = await this.userEnvironmentsRepository.findByUserId(user_id);

        return classToClass(userEnvironments);
    }
}

export default SelectUserEnvironmentServices;