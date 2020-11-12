import { Repository, getRepository } from 'typeorm';
import UserSpecialtie from '../entities/UserSpecialtie';
import ICreateUserSpecialtieDTO from '@modules/users/dtos/ICreateUserSpecialtieDTO';
import IUserSpecialtiesRepository from '@modules/users/repositories/IUserSpecialtiesRepository';

class UserSpecialtiesRepository implements IUserSpecialtiesRepository {
    private ormRepository: Repository<UserSpecialtie>;

    constructor() {
        this.ormRepository = getRepository(UserSpecialtie);
    }

    public async find(): Promise<UserSpecialtie[]> {
        const userSpecialties = await this.ormRepository.find();

        return userSpecialties;
    }

    public async findById(id: string): Promise<UserSpecialtie | undefined> {
        const userSpecialtie = await this.ormRepository.findOne(id);

        return userSpecialtie;
    }

    public async findByUserId(user_id: string): Promise<UserSpecialtie[]> {
        const userSpecialties = await this.ormRepository.find({
            where: { user_id }
        });

        return userSpecialties;
    }

    public async create(dto: ICreateUserSpecialtieDTO): Promise<UserSpecialtie> {
        const userSpecialtie = this.ormRepository.create(dto);

        await this.ormRepository.save(userSpecialtie);

        return userSpecialtie;
    }

    public async save(userSpecialtie: UserSpecialtie): Promise<UserSpecialtie> {
        return await this.ormRepository.save(userSpecialtie);
    }
}

export default UserSpecialtiesRepository;