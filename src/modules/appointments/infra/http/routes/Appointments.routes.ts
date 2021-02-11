import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsController from '../controllers/AppointmentsController';
import UpdateFinishCallController from '../controllers/UpdateFinishCallController';
import UpdateRatingController from '../controllers/UpdateRatingController';
import UpdateStartCallController from '../controllers/UpdateStartCallController';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();
const updateFinishCallController = new UpdateFinishCallController();
const updateRatingController = new UpdateRatingController();
const updateStartCallController = new UpdateStartCallController();

appointmentsRouter.get('/', ensureAuthenticated, appointmentsController.index);
appointmentsRouter.get('/all', ensureAuthenticated, appointmentsController.indexAll);
appointmentsRouter.post('/', ensureAuthenticated, appointmentsController.create);
appointmentsRouter.put('/:id/start', ensureAuthenticated, updateStartCallController.update);
appointmentsRouter.put('/:id/finish', ensureAuthenticated, updateFinishCallController.update);
appointmentsRouter.put('/:id/rating', ensureAuthenticated, updateRatingController.update);

export default appointmentsRouter;