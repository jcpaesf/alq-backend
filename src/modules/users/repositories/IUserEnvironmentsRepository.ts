import ICreateUserEnvironmentDTO from '../dtos/ICreateUserEnvironmentDTO';
import UserEnvironment from '../infra/typeorm/entities/UserEnvironment';

export default interface IUserEnvironmentsRepository {
    find(): Promise<UserEnvironment[]>;
    findById(id: string): Promise<UserEnvironment | undefined>;
    findByUserId(user_id: string): Promise<UserEnvironment[]>;
    create(dto: ICreateUserEnvironmentDTO): Promise<UserEnvironment>;
    save(UserEnvironment: UserEnvironment): Promise<UserEnvironment>;
    delete(id: string): Promise<void>;
}