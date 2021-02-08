import { inject, injectable } from 'tsyringe';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import { classToClass } from 'class-transformer'
import IUsersFindDTO from '@modules/users/dtos/IUsersFindDTO';
import AppError from '@shared/errors/AppError';

interface IRequest {
    user_id: string;
    id: string;
    page: number;
    name?: string;
    specialtie?: string;
}

interface IRequestSite {
    specialtie_id?: string;
    city?: string;
    online?: string;
    presential?: string;
    page?: number;
}

@injectable()
class SelectTherapistServices {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository
    ) { }

    public async execute({ id, page, name, specialtie, user_id }: IRequest): Promise<IUsersFindDTO> {
        const user = await this.usersRepository.findById(user_id);

        if (!user) {
            throw new AppError('Usuário não encontrado');
        }

        const therapists = await this.usersRepository.findTherapists({
            id,
            page,
            nameFilter: name,
            typeFilter: '',
            nameSpecialtie: specialtie,
            isUser: user.type === 'user'
        });

        return classToClass(therapists);
    }

    public async executeSite(dto: IRequestSite): Promise<IUsersFindDTO> {
        const therapist = await this.usersRepository.findTherapistsSite(dto);

        return classToClass(therapist);
    }
}

export default SelectTherapistServices;