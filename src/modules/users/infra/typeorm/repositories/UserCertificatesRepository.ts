import { Repository, getRepository } from 'typeorm';
import UserCertificate from '../entities/UserCertificate';
import ICreateUserCertificateDTO from '@modules/users/dtos/ICreateUserCertificateDTO';
import IUserCertificatesRepository from '@modules/users/repositories/IUserCertificatesRepository';

class UserCertificatesRepository implements IUserCertificatesRepository {
    private ormRepository: Repository<UserCertificate>;

    constructor() {
        this.ormRepository = getRepository(UserCertificate);
    }

    public async find(): Promise<UserCertificate[]> {
        const userCertificates = await this.ormRepository.find();

        return userCertificates;
    }

    public async findById(id: string): Promise<UserCertificate | undefined> {
        const userCertificate = await this.ormRepository.findOne(id);

        return userCertificate;
    }

    public async findByUserId(user_id: string): Promise<UserCertificate[]> {
        const userCertificates = await this.ormRepository.find({
            where: { user_id }
        });

        return userCertificates;
    }

    public async create(dto: ICreateUserCertificateDTO): Promise<UserCertificate> {
        const userCertificate = this.ormRepository.create(dto);

        await this.ormRepository.save(userCertificate);

        return userCertificate;
    }

    public async save(userCertificate: UserCertificate): Promise<UserCertificate> {
        return await this.ormRepository.save(userCertificate);
    }
}

export default UserCertificatesRepository;