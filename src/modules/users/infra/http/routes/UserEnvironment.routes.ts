import { Router } from 'express';
import UserEnvironmentsController from '../controllers/UserEnvironmentsController';
import multer from 'multer';
import uploadConfig from '@config/upload';

const userEnvironmentsRouter = Router();
const upload = multer(uploadConfig.multer);
const userEnvironmentsController = new UserEnvironmentsController();

userEnvironmentsRouter.post('/:id', upload.single('environment'), userEnvironmentsController.create);

export default userEnvironmentsRouter;