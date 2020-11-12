import { Repository, getRepository } from 'typeorm';
import Specialtie from '../entities/Specialtie';
import ICreateSpecialtieDTO from '@modules/users/dtos/ICreateSpecialtieDTO';
import ISpecialtiesRepository from '@modules/users/repositories/ISpecialtiesRepository';

class SpecialtiesRepository implements ISpecialtiesRepository {

    private ormRepository: Repository<Specialtie>;

    constructor() {
        this.ormRepository = getRepository(Specialtie);
    }

    public async find(): Promise<Specialtie[]> {
        const specialties = await this.ormRepository.find();

        return specialties;
    }

    public async findById(id: string): Promise<Specialtie | undefined> {
        const specialtie = await this.ormRepository.findOne(id);

        return specialtie;
    }

    public async create(dto: ICreateSpecialtieDTO): Promise<Specialtie> {
        const specialtie = this.ormRepository.create(dto);

        await this.ormRepository.save(specialtie);

        return specialtie;
    }

    public async save(specialtie: Specialtie): Promise<Specialtie> {
        return await this.ormRepository.save(specialtie);
    }

}

export default SpecialtiesRepository;