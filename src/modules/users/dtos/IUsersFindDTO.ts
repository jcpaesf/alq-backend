import User from '../infra/typeorm/entities/User';

export default interface IUsersFindDTO {
    users: User[];
    total: number;
    total_pages: number;
}