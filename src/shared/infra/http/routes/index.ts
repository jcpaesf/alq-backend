import { Router } from 'express';

import UsersRouter from '@modules/users/infra/http/routes/Users.routes';
import SessionsRouter from '@modules/users/infra/http/routes/Sessions.routes';
import UsersTokenRouter from '@modules/users/infra/http/routes/UsersToken.routes';
import SpecialtiesRouter from '@modules/users/infra/http/routes/Specialties.routes';
import UserResumesRouter from '@modules/users/infra/http/routes/UserResumes.routes';
import UserSchedulesRouter from '@modules/users/infra/http/routes/UserSchedule.routes';
import UserSpecialtiesRouter from '@modules/users/infra/http/routes/UserSpecialties.routes';
import UserCertificatesRouter from '@modules/users/infra/http/routes/UserCertificates.routes';
import UserEnvironmentsRouter from '@modules/users/infra/http/routes/UserEnvironment.routes';

const routes = Router();

routes.use('/users', UsersRouter);
routes.use('/sessions', SessionsRouter);
routes.use('/password', UsersTokenRouter);
routes.use('/specialties', SpecialtiesRouter);
routes.use('/userresumes', UserResumesRouter);
routes.use('/userschedules', UserSchedulesRouter);
routes.use('/userspecialties', UserSpecialtiesRouter);
routes.use('/userenvironment', UserEnvironmentsRouter);
routes.use('/usercertificates', UserCertificatesRouter);

export default routes;