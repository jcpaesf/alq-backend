import { Router } from 'express';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import UserScheduleController from '../controllers/UserScheduleController';

const userSchedulesRouter = Router();
const userScheduleController = new UserScheduleController();

userSchedulesRouter.get('/', ensureAuthenticated, userScheduleController.index);
userSchedulesRouter.post('/', ensureAuthenticated, userScheduleController.create);

export default userSchedulesRouter;