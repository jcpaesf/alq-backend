import { Repository, getRepository } from 'typeorm';
import UserSpecialtie from '../entities/UserSpecialtie';
import ICreateUserSpecialtieDTO from '@modules/users/dtos/ICreateUserSpecialtieDTO';
import IUserSpecialtiesRepository from '@modules/users/repositories/IUserSpecialtiesRepository';
import IFindSpecialtieInUserDTO from '@modules/users/dtos/IFindSpecialtieInUserDTO';
import IGetTimeSpecialtieDTO from '@modules/users/dtos/IGetTimeSpecialtieDTO';

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

    public async findSpecialtieInUser({ specialtie_id, user_id }: IFindSpecialtieInUserDTO): Promise<boolean> {
        const userSpecialtie = await this.ormRepository.findOne({
            where: { specialtie_id, user_id }
        });

        return !!userSpecialtie;
    }

    public async getTimeSpecialtie({ user_id, specialtie_id }: IGetTimeSpecialtieDTO): Promise<number> {
        const userSpecialtie = await this.ormRepository.findOne({
            where: { specialtie_id, user_id }
        });

        if (!userSpecialtie) return 0;

        return userSpecialtie.service_time;
    }

    public async create(dto: ICreateUserSpecialtieDTO): Promise<UserSpecialtie> {
        const userSpecialtie = this.ormRepository.create(dto);

        await this.ormRepository.save(userSpecialtie);

        return userSpecialtie;
    }

    public async save(userSpecialtie: UserSpecialtie): Promise<UserSpecialtie> {
        return await this.ormRepository.save(userSpecialtie);
    }

    public async delete(id: string): Promise<void> {
        await this.ormRepository.delete({
            id
        });
    }
}

export default UserSpecialtiesRepository;