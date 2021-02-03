import { Repository, getRepository, Raw } from 'typeorm';

import User from '../entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IUsersFindDTO from '@modules/users/dtos/IUsersFindDTO';
import IFilterUsersDTO from '@modules/users/dtos/IFilterUsersDTO';
import UserSpecialtie from '../entities/UserSpecialtie';

class UsersRepository implements IUsersRepository {
    private ormRepository: Repository<User>;
    private ormRepositoryUserSpecialtie: Repository<UserSpecialtie>;

    constructor() {
        this.ormRepository = getRepository(User);
        this.ormRepositoryUserSpecialtie = getRepository(UserSpecialtie);
    }

    public async find({ page, nameFilter, typeFilter }: IFilterUsersDTO): Promise<IUsersFindDTO> {
        const skip = page > 1 ? (page - 1) * 10 : 0;

        const [users, total] = await this.ormRepository.findAndCount({
            where: { type: typeFilter, name: Raw(name => nameFilter ? `LOWER(${name}) Like '%${nameFilter.toLowerCase()}%'` : '') },
            skip,
            take: 10
        });

        return {
            users,
            total,
            total_pages: Math.ceil(total / 10)
        };
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

    public async findTherapists({ id, page, nameFilter, nameSpecialtie }: IFilterUsersDTO): Promise<IUsersFindDTO> {
        const skip = page > 1 ? (page - 1) * 10 : 0;

        const [users, total] = await this.ormRepository.findAndCount({
            where: {
                type: 'therapist',
                name: Raw(name => nameFilter ? `LOWER(${name}) Like '%${nameFilter.toLowerCase()}%'` : ''),
                id: Raw(name => id ? `${name} = '${id}'` : '')
            },
            skip,
            take: 10
        });

        for (const user of users) {
            const userSpecialties = await this.ormRepositoryUserSpecialtie.find({
                where: { user_id: user.id },
                relations: ['specialtie']
            });

            const userSpecialtie = userSpecialties.map(userSpc => {
                return {
                    id: userSpc.specialtie_id,
                    description: userSpc.specialtie.description,
                    service_time: userSpc.service_time
                }
            }).filter(userSpc => {
                if (nameSpecialtie && userSpc.description.toLowerCase().indexOf(nameSpecialtie.toLowerCase()) !== -1) {
                    return userSpc;
                }

                return userSpc;
            });

            user['user_specialtie'] = userSpecialtie;
        }

        return {
            users: users.filter(user => nameSpecialtie ? user.user_specialtie.length : user),
            total,
            total_pages: Math.ceil(total / 10)
        };
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