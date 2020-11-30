import ICreateUserSpecialtieDTO from '../dtos/ICreateUserSpecialtieDTO';
import IFindSpecialtieInUserDTO from '../dtos/IFindSpecialtieInUserDTO';
import UserSpecialtie from '../infra/typeorm/entities/UserSpecialtie';

export default interface IUserSpecialtiesRepository {
    find(): Promise<UserSpecialtie[]>;
    findById(id: string): Promise<UserSpecialtie | undefined>;
    findByUserId(user_id: string): Promise<UserSpecialtie[]>;
    findSpecialtieInUser(dto: IFindSpecialtieInUserDTO): Promise<boolean>;
    create(dto: ICreateUserSpecialtieDTO): Promise<UserSpecialtie>;
    save(userSpecialtie: UserSpecialtie): Promise<UserSpecialtie>;
    delete(id: string): Promise<void>;
}