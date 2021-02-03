import { inject, injectable } from 'tsyringe';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import { classToClass } from 'class-transformer'
import IUsersFindDTO from '@modules/users/dtos/IUsersFindDTO';

interface IRequest {
    id: string;
    page: number;
    name?: string;
    specialtie?: string;
}

@injectable()
class SelectTherapistServices {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository
    ) { }

    public async execute({ id, page, name, specialtie }: IRequest): Promise<IUsersFindDTO> {
        const therapists = await this.usersRepository.findTherapists({
            id,
            page,
            nameFilter: name,
            typeFilter: '',
            nameSpecialtie: specialtie
        });

        return classToClass(therapists);
    }
}

export default SelectTherapistServices;