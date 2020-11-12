import { Router } from 'express';
import UserResumesController from '../controllers/UserResumesController';
import multer from 'multer';
import uploadConfig from '@config/upload';

const userResumesRouter = Router();
const upload = multer(uploadConfig.multer);
const userResumesController = new UserResumesController();

userResumesRouter.post('/:id', upload.single('resume'), userResumesController.create);

export default userResumesRouter;