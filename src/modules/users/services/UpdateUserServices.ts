import { inject, injectable } from 'tsyringe';
import IUsersRepository from '../repositories/IUsersRepository';
import User from '../infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import { classToClass } from 'class-transformer';

interface IRequest {
    id: string;
    name: string;
    email: string;
    phone: string;
    city: string;
    neighborhood: string;
    postal_code: string;
    state: string;
    street: string;
    work_presential: boolean;
    work_online: boolean;
    active: boolean;
    description: string;
}

@injectable()
class UpdateUserServices {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository
    ) { }

    public async execute({
        id,
        name,
        email,
        phone,
        city,
        neighborhood,
        postal_code,
        state,
        street,
        work_presential,
        work_online,
        active,
        description
    }: IRequest): Promise<User> {
        const user = await this.usersRepository.findById(id);

        if (!user) {
            throw new AppError('Usuário não encontrado');
        }

        const checkEmailExists = await this.usersRepository.findByEmail(email);

        if (checkEmailExists && checkEmailExists.id !== user.id) {
            throw new AppError('E-mail já está sendo utilizado');
        }

        if (name) user.name = name;
        if (email) user.email = email;
        if (phone) user.phone = phone;
        if (city) user.city = city;
        if (neighborhood) user.neighborhood = neighborhood;
        if (postal_code) user.postal_code = postal_code;
        if (state) user.state = state;
        if (street) user.street = street;
        if (description) user.description = description;

        user.work_presential = work_presential;
        user.work_online = work_online;
        user.active = active;

        await this.usersRepository.save(user);

        return classToClass(user);
    }
}

export default UpdateUserServices;