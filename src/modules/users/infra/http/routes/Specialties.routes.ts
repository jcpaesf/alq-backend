import { Router } from 'express';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import SpecialtiesController from '../controllers/SpecialtiesController';

const specialtiesRouter = Router();
const specialtiesController = new SpecialtiesController();

specialtiesRouter.get('/', ensureAuthenticated, specialtiesController.index);
specialtiesRouter.get('/:id', ensureAuthenticated, specialtiesController.index);
specialtiesRouter.post('/', ensureAuthenticated, specialtiesController.create);
specialtiesRouter.put('/:id', ensureAuthenticated, specialtiesController.update);

export default specialtiesRouter;