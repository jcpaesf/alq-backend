import { Router } from 'express';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import UserScheduleController from '../controllers/UserScheduleController';

const userSchedulesRouter = Router();
const userScheduleController = new UserScheduleController();

userSchedulesRouter.get('/', ensureAuthenticated, userScheduleController.index);
userSchedulesRouter.post('/', ensureAuthenticated, userScheduleController.create);
userSchedulesRouter.put('/:id', ensureAuthenticated, userScheduleController.update);
userSchedulesRouter.delete('/:id', ensureAuthenticated, userScheduleController.delete);

export default userSchedulesRouter;