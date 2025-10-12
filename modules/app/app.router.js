import {Router} from 'express'; 
import { appControllers } from './app.controllers.js';
import { authentication } from '../../middlewares/authentication.middleware.js';
const appRouter = Router();



appRouter.get('/categories',authentication('CLIENT','SERVICE_PROVIDER','ADMIN'),appControllers.getCategoriesController);
appRouter.get('/top-service-providers',authentication('CLIENT','ADMIN'),appControllers.getTopServiceProvidersController);
appRouter.get('/client/account-overview',authentication('CLIENT'),appControllers.getAccountOverviewController);



export default appRouter;