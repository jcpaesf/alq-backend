import { Repository, getRepository } from 'typeorm';
import UserResume from '../entities/UserResume';
import ICreateUserResumeDTO from '@modules/users/dtos/ICreateUserResumeDTO';
import IUserResumesRepository from '@modules/users/repositories/IUserResumesRepository';

class UserResumesRepository implements IUserResumesRepository {
    private ormRepository: Repository<UserResume>;

    constructor() {
        this.ormRepository = getRepository(UserResume);
    }

    public async find(): Promise<UserResume[]> {
        const userResumes = await this.ormRepository.find();

        return userResumes;
    }

    public async findById(id: string): Promise<UserResume | undefined> {
        const userResume = await this.ormRepository.findOne(id);

        return userResume;
    }

    public async findByUserId(user_id: string): Promise<UserResume[]> {
        const userResumes = await this.ormRepository.find({
            where: { user_id }
        });

        return userResumes;
    }

    public async create(dto: ICreateUserResumeDTO): Promise<UserResume> {
        const userResume = this.ormRepository.create(dto);

        await this.ormRepository.save(userResume);

        return userResume;
    }

    public async save(userResume: UserResume): Promise<UserResume> {
        return await this.ormRepository.save(userResume);
    }

    public async delete(id: string): Promise<void> {
        await this.ormRepository.delete({
            id
        });
    }
}

export default UserResumesRepository;