import { Router } from 'express';
import UserResumesController from '../controllers/UserResumesController';
import multer from 'multer';
import uploadConfig from '@config/upload';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const userResumesRouter = Router();
const upload = multer(uploadConfig.multer);
const userResumesController = new UserResumesController();

userResumesRouter.get('/', ensureAuthenticated, userResumesController.index);
userResumesRouter.post('/:id', ensureAuthenticated, upload.single('resume'), userResumesController.create);
userResumesRouter.delete('/:id', ensureAuthenticated, userResumesController.delete);

export default userResumesRouter;