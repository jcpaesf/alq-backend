import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IUsersTokenRepository from '@modules/users/repositories/IUsersTokenRepository';
import UsersTokenRepository from '@modules/users/infra/typeorm/repositories/UsersTokenRepository';

import ISpecialtiesRepository from '@modules/users/repositories/ISpecialtiesRepository';
import SpecialtiesRepository from '@modules/users/infra/typeorm/repositories/SpecialtiesRepository';

import IUserSpecialtiesRepository from '@modules/users/repositories/IUserSpecialtiesRepository';
import UserSpecialtiesRepository from '@modules/users/infra/typeorm/repositories/UserSpecialtiesRepository';

import IUserCertificatesRepository from '@modules/users/repositories/IUserCertificatesRepository';
import UserCertificatesRepository from '@modules/users/infra/typeorm/repositories/UserCertificatesRepository';

import IUserResumesRepository from '@modules/users/repositories/IUserResumesRepository';
import UserResumesRepository from '@modules/users/infra/typeorm/repositories/UserResumesRepository';

import IUserEnvironmentsRepository from '@modules/users/repositories/IUserEnvironmentsRepository';
import UserEnvironmentsRepository from '@modules/users/infra/typeorm/repositories/UserEnvironmentsRepository';

import IUserSchedulesRepository from '@modules/users/repositories/IUserSchedulesRepository';
import UserSchedulesRepository from '@modules/users/infra/typeorm/repositories/UserSchedulesRepository';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';

container.registerSingleton<IUsersRepository>(
    'UsersRepository',
    UsersRepository
);

container.registerSingleton<IUsersTokenRepository>(
    'UsersTokenRepository',
    UsersTokenRepository
);

container.registerSingleton<ISpecialtiesRepository>(
    'SpecialtiesRepository',
    SpecialtiesRepository
);

container.registerSingleton<IUserSpecialtiesRepository>(
    'UserSpecialtiesRepository',
    UserSpecialtiesRepository
);

container.registerSingleton<IUserCertificatesRepository>(
    'UserCertificatesRepository',
    UserCertificatesRepository
);

container.registerSingleton<IUserResumesRepository>(
    'UserResumesRepository',
    UserResumesRepository
);

container.registerSingleton<IUserEnvironmentsRepository>(
    'UserEnvironmentsRepository',
    UserEnvironmentsRepository
);

container.registerSingleton<IUserSchedulesRepository>(
    'UserSchedulesRepository',
    UserSchedulesRepository
);

container.registerSingleton<IAppointmentsRepository>(
    'AppointmentsRepository',
    AppointmentsRepository
);