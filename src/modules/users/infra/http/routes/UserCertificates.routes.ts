import { Router } from 'express';
import UserCertificatesController from '../controllers/UserCertificatesController';
import multer from 'multer';
import uploadConfig from '@config/upload';

const userCertificatesRouter = Router();
const upload = multer(uploadConfig.multer);
const userCertificatesController = new UserCertificatesController();

userCertificatesRouter.post('/:id', upload.single('certificate'), userCertificatesController.create);

export default userCertificatesRouter;