

import {Router} from 'express';
import { userControllers } from './user.controllers.js';
import { authentication } from '../../middlewares/authentication.middleware.js';
import upload from '../../config/multer.config.js';


const userRouter = Router();


// email verification
userRouter.post('/signup/send-email',userControllers.createUserWithEmailController);
userRouter.post('/signup/email-verification',userControllers.createUserWithEmailVerificationController);

// phone verification
userRouter.post('/signup/send-phone',userControllers.createUserWithPhoneController);
userRouter.post('/signup/phone-verification',userControllers.createUserWithPhoneVerificationController);

// identity verification
userRouter.post('/signup/identity-verification',upload.array('images'),userControllers.createUserIdentityVerificationController);

// set password and address
userRouter.post('/signup/set-password',userControllers.createUserSetPasswordController);

// user update 
userRouter.patch('/update',authentication('CLIENT','SERVICE_PROVIDER','ADMIN'),
userControllers.userUpdateController);

// user profile picture update 
userRouter.patch('/profile-picture',upload.single('image'),
authentication('CLIENT','SERVICE_PROVIDER','ADMIN'),
userControllers.profilePictureUpdateController);



export default userRouter;