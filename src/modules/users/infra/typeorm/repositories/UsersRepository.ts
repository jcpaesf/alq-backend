import { Repository, getRepository, Raw } from 'typeorm';

import User from '../entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IUsersFindDTO from '@modules/users/dtos/IUsersFindDTO';
import IFilterUsersDTO from '@modules/users/dtos/IFilterUsersDTO';
import IFilterTherapistSiteDTO from '@modules/users/dtos/IFilterTherapistSiteDTO';
import UserSpecialtie from '../entities/UserSpecialtie';

interface UserSpc {
    id: string;
    description: string;
    service_time: number
}

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

    public async findTherapists({ id, page, nameFilter, nameSpecialtie, isUser }: IFilterUsersDTO): Promise<IUsersFindDTO> {
        const skip = page > 1 ? (page - 1) * 10 : 0;

        let [users, total] = await this.ormRepository.findAndCount({
            where: {
                type: 'therapist',
                name: Raw(name => nameFilter ? `LOWER(${name}) Like '%${nameFilter.toLowerCase()}%'` : ''),
                status: Raw(status => isUser ? `${status} = 'approved'` : ''),
                id: Raw(name => id ? `${name} = '${id}'` : ''),
                active: Raw(active => isUser ? `${active} = true` : ''),
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
            });

            user['user_specialtie'] = userSpecialtie;
        }

        if (nameSpecialtie) {
            users = users.filter(user => user.user_specialtie.findIndex(specialtie => specialtie.description.toLowerCase().indexOf(nameSpecialtie.toLowerCase()) !== -1) !== -1);
        }

        return {
            users: users.filter(user => nameSpecialtie ? user.user_specialtie.length : user),
            total,
            total_pages: Math.ceil(total / 10)
        };
    }

    public async findTherapistsSite({
        specialtie_id,
        city: cityFilter,
        online,
        presential,
        page
    }: IFilterTherapistSiteDTO): Promise<IUsersFindDTO> {
        const skip = page && page > 1 ? (page - 1) * 10 : 0;

        let [users, total] = await this.ormRepository.findAndCount({
            where: {
                type: 'therapist',
                city: Raw(city => cityFilter ? `LOWER(${city}) Like '%${cityFilter.toLowerCase()}%'` : ''),
                work_online: Raw(workOnline => online !== undefined ? `${workOnline} = CAST(${online} as boolean)` : ''),
                work_presential: Raw(workPresential => presential !== undefined ? `${workPresential} = CAST(${presential} as boolean)` : '')
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
            });

            user['user_specialtie'] = userSpecialtie;
        }

        if (specialtie_id) {
            users = users.filter(user => user.user_specialtie.findIndex(specialtie => specialtie.id === specialtie_id) !== -1);
        }

        return {
            users: users.filter(user => specialtie_id ? user.user_specialtie.length : user),
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