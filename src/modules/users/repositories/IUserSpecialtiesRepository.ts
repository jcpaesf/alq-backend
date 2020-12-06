import ICreateUserSpecialtieDTO from '../dtos/ICreateUserSpecialtieDTO';
import IFindSpecialtieInUserDTO from '../dtos/IFindSpecialtieInUserDTO';
import IGetTimeSpecialtieDTO from '../dtos/IGetTimeSpecialtieDTO';
import IFindSpecialtiesByUserIdDTO from '../dtos/IFindSpecialtiesByUserIdDTO';
import UserSpecialtie from '../infra/typeorm/entities/UserSpecialtie';

export default interface IUserSpecialtiesRepository {
    find(): Promise<UserSpecialtie[]>;
    findById(id: string): Promise<UserSpecialtie | undefined>;
    findByUserId(dto: IFindSpecialtiesByUserIdDTO): Promise<UserSpecialtie[]>;
    getTimeSpecialtie(dto: IGetTimeSpecialtieDTO): Promise<number>;
    findSpecialtieInUser(dto: IFindSpecialtieInUserDTO): Promise<boolean>;
    create(dto: ICreateUserSpecialtieDTO): Promise<UserSpecialtie>;
    save(userSpecialtie: UserSpecialtie): Promise<UserSpecialtie>;
    delete(id: string): Promise<void>;
}