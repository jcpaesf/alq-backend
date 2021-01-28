import { Repository, getRepository } from 'typeorm';
import Specialtie from '../entities/Specialtie';
import ICreateSpecialtieDTO from '@modules/users/dtos/ICreateSpecialtieDTO';
import ISpecialtiesFindDTO from '@modules/users/dtos/ISpecialtiesFindDTO';
import ISpecialtiesRepository from '@modules/users/repositories/ISpecialtiesRepository';

class SpecialtiesRepository implements ISpecialtiesRepository {

    private ormRepository: Repository<Specialtie>;

    constructor() {
        this.ormRepository = getRepository(Specialtie);
    }

    public async find(page: number): Promise<ISpecialtiesFindDTO | Specialtie[]> {
        if (!page) {
            return await this.ormRepository.find({
                order: { description: 'ASC' }
            });
        }

        const skip = page > 1 ? (page - 1) * 10 : 0;

        const [specialties, total] = await this.ormRepository.findAndCount({
            skip,
            take: 10,
            order: { description: 'ASC' }
        });

        return {
            specialties,
            total,
            total_pages: Math.ceil(total / 10)
        };
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

    public async delete(id: string): Promise<void> {
        await this.ormRepository.delete({
            id
        });
    }

}

export default SpecialtiesRepository;