import { Router } from 'express';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import UserSpecialtieController from '../controllers/UserSpecialtieController';
import UserSpecialtiesServiceTimeController from '../controllers/UserSpecialtiesServiceTimeController';

const specialtiesRouter = Router();
const userSpecialtieController = new UserSpecialtieController();
const userSpecialtiesServiceTimeController = new UserSpecialtiesServiceTimeController();

specialtiesRouter.post('/', ensureAuthenticated, userSpecialtieController.create);
specialtiesRouter.patch('/servicetime', ensureAuthenticated, userSpecialtiesServiceTimeController.update);

export default specialtiesRouter;