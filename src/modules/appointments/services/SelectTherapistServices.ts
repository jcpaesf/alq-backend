import { inject, injectable } from 'tsyringe';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import User from '@modules/users/infra/typeorm/entities/User';
import { classToClass } from 'class-transformer'

@injectable()
class SelectTherapistServices {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository
    ) { }

    public async execute(): Promise<User[]> {
        const therapists = await this.usersRepository.findTherapists();

        return classToClass(therapists);
    }
}

export default SelectTherapistServices;