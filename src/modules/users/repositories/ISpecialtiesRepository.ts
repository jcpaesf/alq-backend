import Specialtie from '../infra/typeorm/entities/Specialtie';
import ICreateSpecialtieDTO from '../dtos/ICreateSpecialtieDTO';
export default interface ISpecialtiesRepository {
    find(): Promise<Specialtie[]>;
    findById(id: string): Promise<Specialtie | undefined>;
    create(dto: ICreateSpecialtieDTO): Promise<Specialtie>;
    save(specialtie: Specialtie): Promise<Specialtie>;
    delete(id: string): Promise<void>;
}