

import {Router} from 'express'; 
import { bankAccountControllers } from './bank.controllers.js';
import { authentication } from '../../middlewares/authentication.middleware.js';


const bankAccountRouter = Router();


// add bank account
bankAccountRouter.post('/',
    authentication('SERVICE_PROVIDER','CLIENT','ADMIN'),
     bankAccountControllers.addBankAccountController);

// get my bank accounts
bankAccountRouter.get('/my',
    authentication('SERVICE_PROVIDER','CLIENT','ADMIN'),
     bankAccountControllers.getMyBankAccountsController);

// update bank account
bankAccountRouter.patch('/:id',
    authentication('SERVICE_PROVIDER','CLIENT','ADMIN'),
     bankAccountControllers.updateBankAccountController);

// delete bank account
bankAccountRouter.delete('/:id',
    authentication('SERVICE_PROVIDER','CLIENT','ADMIN'),
     bankAccountControllers.deleteBankAccountController);



export default bankAccountRouter;