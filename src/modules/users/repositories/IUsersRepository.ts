import User from '../infra/typeorm/entities/User';
import ICreateUserDTO from '../dtos/ICreateUserDTO';
import IUsersFindDTO from '../dtos/IUsersFindDTO';
import IFilterUsersDTO from '../dtos/IFilterUsersDTO';
import IFilterTherapistSiteDTO from '../dtos/IFilterTherapistSiteDTO';

export default interface IUsersRepository {
    find(dto: IFilterUsersDTO): Promise<IUsersFindDTO>;
    getTotalUsers(): Promise<number>;
    getTotalUsers30Days(): Promise<number>;
    findTherapists(dto: IFilterUsersDTO): Promise<IUsersFindDTO>;
    findTherapistsSite(dto: IFilterTherapistSiteDTO): Promise<IUsersFindDTO>;
    getTotalTherapists(): Promise<number>;
    getTotalTherapists30Days(): Promise<number>;
    getTotalTherapistsAnalyzing(): Promise<number>;
    getTotalTherapistsAnalyzing7Days(): Promise<number>;
    findById(id: string): Promise<User | undefined>;
    findByEmail(email: string): Promise<User | undefined>;
    create(data: ICreateUserDTO): Promise<User>;
    save(user: User): Promise<User>;
}