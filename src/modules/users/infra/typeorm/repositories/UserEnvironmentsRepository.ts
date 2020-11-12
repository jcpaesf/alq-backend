import { Repository, getRepository } from 'typeorm';
import UserEnvironment from '../entities/UserEnvironment';
import ICreateUserEnvironmentDTO from '@modules/users/dtos/ICreateUserEnvironmentDTO';
import IUserEnvironmentsRepository from '@modules/users/repositories/IUserEnvironmentsRepository';

class UserEnvironmentsRepository implements IUserEnvironmentsRepository {
    private ormRepository: Repository<UserEnvironment>;

    constructor() {
        this.ormRepository = getRepository(UserEnvironment);
    }

    public async find(): Promise<UserEnvironment[]> {
        const userEnvironments = await this.ormRepository.find();

        return userEnvironments;
    }

    public async findById(id: string): Promise<UserEnvironment | undefined> {
        const userEnvironment = await this.ormRepository.findOne(id);

        return userEnvironment;
    }

    public async findByUserId(user_id: string): Promise<UserEnvironment[]> {
        const userEnvironments = await this.ormRepository.find({
            where: { user_id }
        });

        return userEnvironments;
    }

    public async create(dto: ICreateUserEnvironmentDTO): Promise<UserEnvironment> {
        const userEnvironment = this.ormRepository.create(dto);

        await this.ormRepository.save(userEnvironment);

        return userEnvironment;
    }

    public async save(userEnvironment: UserEnvironment): Promise<UserEnvironment> {
        return await this.ormRepository.save(userEnvironment);
    }
}

export default UserEnvironmentsRepository;