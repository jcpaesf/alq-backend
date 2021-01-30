import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsController from '../controllers/AppointmentsController';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();

appointmentsRouter.get('/', ensureAuthenticated, appointmentsController.index);
appointmentsRouter.get('/all', ensureAuthenticated, appointmentsController.indexAll);
appointmentsRouter.post('/', ensureAuthenticated, appointmentsController.create);

export default appointmentsRouter;