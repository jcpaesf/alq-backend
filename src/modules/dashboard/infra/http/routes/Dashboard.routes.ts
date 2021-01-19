import { Router } from 'express';
import DashboardController from '../controllers/DashboardController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const dashboardRouter = Router();
const dashboardController = new DashboardController();

dashboardRouter.get('/', ensureAuthenticated, dashboardController.index);

export default dashboardRouter;