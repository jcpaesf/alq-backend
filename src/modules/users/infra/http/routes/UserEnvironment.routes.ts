import { Router } from 'express';
import UserEnvironmentsController from '../controllers/UserEnvironmentsController';
import multer from 'multer';
import uploadConfig from '@config/upload';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const userEnvironmentsRouter = Router();
const upload = multer(uploadConfig.multer);
const userEnvironmentsController = new UserEnvironmentsController();

userEnvironmentsRouter.get('/', ensureAuthenticated, userEnvironmentsController.index);
userEnvironmentsRouter.post('/:id', ensureAuthenticated, upload.single('environment'), userEnvironmentsController.create);
userEnvironmentsRouter.delete('/:id', ensureAuthenticated, userEnvironmentsController.delete);

export default userEnvironmentsRouter;