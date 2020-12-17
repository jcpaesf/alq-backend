import { Router } from 'express';
import UserCertificatesController from '../controllers/UserCertificatesController';
import multer from 'multer';
import uploadConfig from '@config/upload';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const userCertificatesRouter = Router();
const upload = multer(uploadConfig.multer);
const userCertificatesController = new UserCertificatesController();

userCertificatesRouter.get('/', ensureAuthenticated, userCertificatesController.index);
userCertificatesRouter.post('/:id', ensureAuthenticated, upload.single('certificate'), userCertificatesController.create);
userCertificatesRouter.delete('/:id', ensureAuthenticated, userCertificatesController.delete);

export default userCertificatesRouter;