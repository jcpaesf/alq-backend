import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import User from '../infra/typeorm/entities/User';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IUsersTokenRepository from '../repositories/IUsersTokenRepository';
import { classToClass } from 'class-transformer';
import path from 'path';

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
    street: string;
    work_presential: boolean;
    work_online: boolean;
    type: TypeUser;
    specialties?: ISpecialtieDTO[];
    description: string;
    summary: string;
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
        private usersTokenRepository: IUsersTokenRepository
    ) { }

    public async execute(userDto: IRequest): Promise<User> {
        const checkUserEmailExists = await this.usersRepository.findByEmail(userDto.email);

        if (checkUserEmailExists) {
            throw new AppError('E-mail já cadastrado');
        }

        if (userDto.type !== 'therapist' && userDto.type !== 'user' && userDto.type !== 'admin') {
            throw new AppError('Tipo de usuário inválido');
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
            street: userDto.street,
            work_online: userDto.work_online,
            work_presential: userDto.work_presential,
            type: userDto.type,
            confirm_email: (userDto.type === 'admin' ? true : false),
            description: userDto.description,
            summary: userDto.summary
        });

        const confirmEmailTemplate = path.resolve(__dirname, '..', 'views', 'confirm_email.hbs');
        const userToken = await this.usersTokenRepository.generate(user.id);

        await this.mailProvider.sendMail({
            to: {
                name: user.name,
                email: user.email
            },
            subject: '[Alquimia do Coração] Confirmação de e-mail',
            templateData: {
                file: confirmEmailTemplate,
                variables: {
                    name: user.name,
                    link: `${process.env.APP_WEB_URL}/email-verification?token=${userToken.token}&email=${user.email}`
                }
            }
        });

        return classToClass(user);
    }
}

export default CreateUserServices;