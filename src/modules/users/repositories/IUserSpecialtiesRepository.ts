import ICreateUserSpecialtieDTO from '../dtos/ICreateUserSpecialtieDTO';
import UserSpecialtie from '../infra/typeorm/entities/UserSpecialtie';

export default interface IUserSpecialtiesRepository {
    find(): Promise<UserSpecialtie[]>;
    findById(id: string): Promise<UserSpecialtie | undefined>;
    findByUserId(user_id: string): Promise<UserSpecialtie[]>;
    create(dto: ICreateUserSpecialtieDTO): Promise<UserSpecialtie>;
    save(userSpecialtie: UserSpecialtie): Promise<UserSpecialtie>;
}