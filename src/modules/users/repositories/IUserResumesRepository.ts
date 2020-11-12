import ICreateUserResumeDTO from '../dtos/ICreateUserResumeDTO';
import UserResume from '../infra/typeorm/entities/UserResume';

export default interface IUserResumesRepository {
    find(): Promise<UserResume[]>;
    findById(id: string): Promise<UserResume | undefined>;
    findByUserId(user_id: string): Promise<UserResume[]>;
    create(dto: ICreateUserResumeDTO): Promise<UserResume>;
    save(UserResume: UserResume): Promise<UserResume>;
}