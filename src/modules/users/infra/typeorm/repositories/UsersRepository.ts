import { Repository, getRepository, Raw } from 'typeorm';

import User from '../entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

class UsersRepository implements IUsersRepository {
    private ormRepository: Repository<User>;

    constructor() {
        this.ormRepository = getRepository(User);
    }

    public async find(): Promise<User[]> {
        const users = await this.ormRepository.find({
            where: { type: 'user' }
        });

        return users;
    }

    public async getTotalUsers(): Promise<number> {
        const totalUsers = await this.ormRepository.count({
            where: { type: 'user' }
        });

        return totalUsers;
    }

    public async getTotalUsers30Days(): Promise<number> {
        const totalUsers30Days = await this.ormRepository.count({
            where: {
                type: 'user',
                created_at: Raw(dateFieldName =>
                    `to_date(to_char(${dateFieldName}, 'DD-MM-YYYY'), 'DD-MM-YYYY') >= to_date(to_char((current_date - 30), 'DD-MM-YYYY'), 'DD-MM-YYYY')`
                )
            }
        });

        return totalUsers30Days;
    }

    public async findTherapists(): Promise<User[]> {
        const users = await this.ormRepository.find({
            where: { type: 'therapist' }
        });

        return users;
    }

    public async getTotalTherapists(): Promise<number> {
        const totalTherapist = await this.ormRepository.count({
            where: { type: 'therapist' }
        });

        return totalTherapist;
    }

    public async getTotalTherapists30Days(): Promise<number> {
        const totalTherapist30Days = await this.ormRepository.count({
            where: {
                type: 'therapist',
                created_at: Raw(dateFieldName =>
                    `to_date(to_char(${dateFieldName}, 'DD-MM-YYYY'), 'DD-MM-YYYY') >= to_date(to_char((current_date - 30), 'DD-MM-YYYY'), 'DD-MM-YYYY')`
                )
            }
        });

        return totalTherapist30Days;
    }

    public async getTotalTherapistsAnalyzing(): Promise<number> {
        const totalTherapistAnalyzing = await this.ormRepository.count({
            where: {
                type: 'therapist',
                status: 'analyzing'
            }
        });

        return totalTherapistAnalyzing;
    }

    public async getTotalTherapistsAnalyzing7Days(): Promise<number> {
        const totalTherapistAnalyzing7Days = await this.ormRepository.count({
            where: {
                type: 'therapist',
                status: 'analyzing',
                created_at: Raw(dateFieldName =>
                    `to_date(to_char(${dateFieldName}, 'DD-MM-YYYY'), 'DD-MM-YYYY') >= to_date(to_char((current_date - 7), 'DD-MM-YYYY'), 'DD-MM-YYYY')`
                )
            }
        });

        return totalTherapistAnalyzing7Days;
    }

    public async findById(id: string): Promise<User | undefined> {
        const user = await this.ormRepository.findOne(id);

        return user;
    }

    public async findByEmail(email: string): Promise<User | undefined> {
        const user = await this.ormRepository.findOne({
            where: { email }
        });

        return user;
    }

    public async create(dataUser: ICreateUserDTO): Promise<User> {
        const user = this.ormRepository.create(dataUser);

        await this.ormRepository.save(user);

        return user;
    }

    public async save(user: User): Promise<User> {
        return await this.ormRepository.save(user);
    }
}

export default UsersRepository;