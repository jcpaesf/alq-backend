import Specialtie from '../infra/typeorm/entities/Specialtie';

export default interface ISpecialtiesFindDTO {
    specialties: Specialtie[];
    total: number;
    total_pages: number;
}