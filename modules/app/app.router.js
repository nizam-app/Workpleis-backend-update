import {Router} from 'express'; 
import { appControllers } from './app.controllers.js';
import { authentication } from '../../middlewares/authentication.middleware.js';
const appRouter = Router();


// get categories 
appRouter.get('/categories',authentication('CLIENT','SERVICE_PROVIDER','ADMIN'),appControllers.getCategoriesController);

// get top service provider
appRouter.get('/top-service-providers',authentication('CLIENT','ADMIN'),appControllers.getTopServiceProvidersController);

// get client account overview 
appRouter.get('/client/account-overview',authentication('CLIENT'),appControllers.getAccountOverviewController);

// get profile details (public)
appRouter.get('/profile/details/:id',
    authentication('CLIENT','SERVICE_PROVIDER','ADMIN'),
    appControllers.getProfileDetailsPublicController);



export default appRouter;