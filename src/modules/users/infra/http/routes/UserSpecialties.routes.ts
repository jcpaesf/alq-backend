import { Router } from 'express';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import UserSpecialtiesServiceTimeController from '../controllers/UserSpecialtiesServiceTimeController';

const specialtiesRouter = Router();
const userSpecialtiesServiceTimeController = new UserSpecialtiesServiceTimeController();

specialtiesRouter.patch('/servicetime', ensureAuthenticated, userSpecialtiesServiceTimeController.update);

export default specialtiesRouter;