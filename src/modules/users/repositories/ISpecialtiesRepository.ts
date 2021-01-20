import Specialtie from '../infra/typeorm/entities/Specialtie';
import ICreateSpecialtieDTO from '../dtos/ICreateSpecialtieDTO';
import ISpecialtiesFindDTO from '../dtos/ISpecialtiesFindDTO';
export default interface ISpecialtiesRepository {
    find(page: number): Promise<ISpecialtiesFindDTO>;
    findById(id: string): Promise<Specialtie | undefined>;
    create(dto: ICreateSpecialtieDTO): Promise<Specialtie>;
    save(specialtie: Specialtie): Promise<Specialtie>;
    delete(id: string): Promise<void>;
}