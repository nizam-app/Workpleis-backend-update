import {Router} from 'express';
import { authentication } from '../../middlewares/authentication.middleware.js';

import upload from '../../config/multer.config.js';
import { specialProjectControllers } from './special.controllers.js';


const specialRouter = Router();


// create special project
specialRouter.post('/',upload.array('images'),authentication('CLIENT'),specialProjectControllers.createSpecialController);

// get all special project
specialRouter.get('/',authentication('ADMIN'),specialProjectControllers.getAllSpecialsController);

// special project details
specialRouter.get('/:id',authentication('CLIENT','ADMIN'),specialProjectControllers.getSpecialDetailsController);

//get my jobs
specialRouter.get('/client/my-specials',authentication('CLIENT'),specialProjectControllers.getSpecialsByClientController);

//get jobs posted by a client 
specialRouter.get('/client/all-specials/:id',authentication('ADMIN'),specialProjectControllers.getSpecialsForClientController);

// specialRouter.get('/client/jobs/:id',authentication('CLIENT','SERVICE_PROVIDER','ADMIN'),jobControllers.);
specialRouter.get('/search/specials',authentication('ADMIN'),specialProjectControllers.searchSpecialsByTitleController);



export default specialRouter;