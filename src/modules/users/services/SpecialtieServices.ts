import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import ICreateSpecialtieDTO from '../dtos/ICreateSpecialtieDTO';
import IUpdateSpecialtieDTO from '../dtos/IUpdateSpecialtieDTO';
import Specialtie from '../infra/typeorm/entities/Specialtie';
import ISpecialtiesRepository from '../repositories/ISpecialtiesRepository';
import IDeleteSpecialtieDTO from '../dtos/IDeleteSpecialtieDTO';
import IUsersRepository from '../repositories/IUsersRepository';
import ISpecialtiesFindDTO from '../dtos/ISpecialtiesFindDTO';

interface IRequest {
    id: string;
    page: number;
}

@injectable()
class SpecialtiesServices {
    constructor(
        @inject('SpecialtiesRepository')
        private specialtiesRepository: ISpecialtiesRepository,
        @inject('UsersRepository')
        private usersRepository: IUsersRepository
    ) { }

    public async index({ id, page }: IRequest): Promise<ISpecialtiesFindDTO | Specialtie> {
        let specialtie: Specialtie[] | Specialtie | undefined | ISpecialtiesFindDTO;

        if (id) {
            specialtie = await this.specialtiesRepository.findById(id);

            if (!specialtie) {
                throw new AppError('Especialidade não encontrada');
            }

            return specialtie;
        }

        specialtie = await this.specialtiesRepository.find(page);

        return specialtie;
    }

    public async execute(dto: ICreateSpecialtieDTO, auth_user: string): Promise<Specialtie> {
        const user = await this.usersRepository.findById(auth_user);

        if (!user) {
            throw new AppError('Usuário não autenticado');
        }

        if (user.type !== 'admin') {
            throw new AppError('Usuário não é administrador');
        }

        const specialtie = await this.specialtiesRepository.create(dto);

        return specialtie;
    }

    public async update(dto: IUpdateSpecialtieDTO, auth_user: string): Promise<Specialtie> {
        const user = await this.usersRepository.findById(auth_user);

        if (!user) {
            throw new AppError('Usuário não autenticado');
        }

        if (user.type !== 'admin') {
            throw new AppError('Usuário não é administrador');
        }

        const specialtie = await this.specialtiesRepository.findById(dto.id);

        if (!specialtie) {
            throw new AppError('Especialidade não encontrada');
        }

        specialtie.description = dto.description;
        specialtie.active = dto.active;

        await this.specialtiesRepository.save(specialtie);

        return specialtie;
    }

    public async delete(dto: IDeleteSpecialtieDTO): Promise<void> {
        const user = await this.usersRepository.findById(dto.auth_user);

        if (!user) {
            throw new AppError('Usuário não autenticado');
        }

        if (user.type !== 'admin') {
            throw new AppError('Usuário não é administrador');
        }

        await this.specialtiesRepository.delete(dto.id);
    }
}

export default SpecialtiesServices;