import { Router } from 'express';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import UserSpecialtieController from '../controllers/UserSpecialtieController';
import UserSpecialtiesServiceTimeController from '../controllers/UserSpecialtiesServiceTimeController';
import SelectTherapistSpecialtiesController from '../controllers/SelectTherapistSpecialtiesController';

const specialtiesRouter = Router();
const userSpecialtieController = new UserSpecialtieController();
const userSpecialtiesServiceTimeController = new UserSpecialtiesServiceTimeController();
const selectTherapistSpecialtiesController = new SelectTherapistSpecialtiesController();

specialtiesRouter.get('/', ensureAuthenticated, userSpecialtieController.index);
specialtiesRouter.get('/:id/therapist', ensureAuthenticated, selectTherapistSpecialtiesController.index);
specialtiesRouter.post('/', ensureAuthenticated, userSpecialtieController.create);
specialtiesRouter.patch('/servicetime', ensureAuthenticated, userSpecialtiesServiceTimeController.update);
specialtiesRouter.delete('/:id', ensureAuthenticated, userSpecialtieController.delete);

export default specialtiesRouter;