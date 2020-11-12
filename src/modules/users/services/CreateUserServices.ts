import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import User from '../infra/typeorm/entities/User';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IUsersTokenRepository from '../repositories/IUsersTokenRepository';
import IUserSpecialtiesRepository from '../repositories/IUserSpecialtiesRepository';
import { classToClass } from 'class-transformer';
import path from 'path';
import UserSpecialtie from '../infra/typeorm/entities/UserSpecialtie';

enum TypeUser {
    User = 'user',
    Therapist = 'therapist',
    Admin = 'admin'
}

interface ISpecialtieDTO {
    id: string;
}

interface IRequest {
    name: string;
    email: string;
    password: string;
    phone: string;
    city: string;
    neighborhood: string;
    postal_code: string;
    state: string;
    work_presential: boolean;
    work_online: boolean;
    type: TypeUser;
    aproved: boolean;
    specialties?: ISpecialtieDTO[];
}

@injectable()
class CreateUserServices {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider,

        @inject('MailProvider')
        private mailProvider: IMailProvider,

        @inject('UsersTokenRepository')
        private usersTokenRepository: IUsersTokenRepository,

        @inject('UserSpecialtiesRepository')
        private userSpecialtiesRepository: IUserSpecialtiesRepository
    ) { }

    public async execute(userDto: IRequest): Promise<User> {
        let specialties: UserSpecialtie[] = [];
        const checkUserEmailExists = await this.usersRepository.findByEmail(userDto.email);

        if (checkUserEmailExists) {
            throw new AppError('E-mail já cadastrado', 401);
        }

        if (userDto.type === 'therapist' && !userDto.specialties?.length) {
            throw new AppError('Informe as especialidades do terapeuta');
        }

        const hashedPassword = await this.hashProvider.generateHash(userDto.password);

        const user = await this.usersRepository.create({
            name: userDto.name,
            email: userDto.email,
            password: hashedPassword,
            city: userDto.city,
            neighborhood: userDto.neighborhood,
            phone: userDto.phone,
            postal_code: userDto.postal_code,
            state: userDto.state,
            work_online: userDto.work_online,
            work_presential: userDto.work_presential,
            type: userDto.type,
            aproved: (userDto.type === 'user' ? true : false)
        });

        if (userDto.specialties?.length) {
            for (const userSpecialties of userDto.specialties) {
                let specialtie = await this.userSpecialtiesRepository.findById(userSpecialties.id);

                if (!specialtie) {
                    throw new AppError('Especialidade inválida');
                }

                specialtie = await this.userSpecialtiesRepository.create({
                    user_id: user.id,
                    specialtie_id: specialtie.id
                });

                specialties.push(specialtie);
            }

            Object.assign(user, { specialties });
        }

        // const confirmEmailTemplate = path.resolve(__dirname, '..', 'views', 'confirm_email.hbs');
        // const userToken = await this.usersTokenRepository.generate(user.id);

        // await this.mailProvider.sendMail({
        //     to: {
        //         name: user.name,
        //         email: user.email
        //     },
        //     subject: '[Alquimia do Coração] Confirmação de e-mail',
        //     templateData: {
        //         file: confirmEmailTemplate,
        //         variables: {
        //             name: user.name,
        //             link: `${process.env.APP_WEB_URL}/confirm_email?token=${userToken.token}&email=${user.email}`
        //         }
        //     }
        // });

        return classToClass(user);
    }
}

export default CreateUserServices;