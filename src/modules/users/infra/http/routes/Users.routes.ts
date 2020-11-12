import { Router } from 'express';

import multer from 'multer';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import uploadConfig from '@config/upload';
import UsersController from '../controllers/UsersController';
import UserAvatarController from '../controllers/UserAvatarController';
import ConfirmEmailController from '../controllers/ConfirmEmailController';
import UserAprovedController from '../controllers/UserAprovedController';

const usersRouter = Router();
const upload = multer(uploadConfig.multer);
const usersController = new UsersController();
const userAvatarController = new UserAvatarController();
const confirmEmailController = new ConfirmEmailController();
const userAprovedController = new UserAprovedController();

usersRouter.get('/', ensureAuthenticated, usersController.index);
usersRouter.get('/:id', ensureAuthenticated, usersController.index);
usersRouter.post('/', usersController.create);
usersRouter.put('/', ensureAuthenticated, usersController.update);
usersRouter.patch('/avatar/:id', upload.single('avatar'), userAvatarController.update);
usersRouter.patch('/confirm', confirmEmailController.update);
usersRouter.patch('/:id/aproved', ensureAuthenticated, userAprovedController.update);

export default usersRouter;