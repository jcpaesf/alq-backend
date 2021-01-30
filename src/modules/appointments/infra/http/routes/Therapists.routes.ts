import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import TherapistsController from '../controllers/TherapistsController';
import MonthAvailabilityController from '../controllers/MonthAvailabilityController';
import DayAvailabilityController from '../controllers/DayAvailabilityController';
import TherapistAttachmentsController from '../controllers/TherapistAttachmentsController';

const therapistsRouter = Router();
const therapistsController = new TherapistsController();
const monthAvailabilityController = new MonthAvailabilityController();
const dayAvailabilityController = new DayAvailabilityController();
const therapistAttachmentsController = new TherapistAttachmentsController();

therapistsRouter.get('/:id/day/availability', ensureAuthenticated, dayAvailabilityController.index);
therapistsRouter.get('/:id/month/availability', ensureAuthenticated, monthAvailabilityController.index);
therapistsRouter.get('/', ensureAuthenticated, therapistsController.index);
therapistsRouter.get('/attachments/:id', ensureAuthenticated, therapistAttachmentsController.index);

export default therapistsRouter;