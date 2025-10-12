import { asyncHandler } from "../../utils/asyncHandler.js";
import { sendResponse } from "../../utils/sendResponse.js";
import { userServices } from "./user.services.js";

// email verification
const createUserWithEmailController = asyncHandler(async(req , res)=>{

    const user = await userServices.createUserWithEmailService(req.body);

    sendResponse(res,{
        statusCode : 201,
        success : true,
        message : `Verifcation code was send by ${user.email}`,
        data : {
            email : user.email,
            code : user.emailVerificationCode
        } 
    });
});

const createUserWithEmailVerificationController = asyncHandler(async(req , res)=>{
    const user = await userServices.createUserWithEmalVerificationService(req.body);

    sendResponse(res,{
        statusCode : 200,
        success : true,
        message : `Email verification successfull`,
        data : {
            email : user.email,
            isvisVerifiedEmail : user.isVerifiedEmail
        } 
    });
});

// phone verification
const createUserWithPhoneController = asyncHandler(async(req , res)=>{

    const user = await userServices.createUserWithPhoneService(req.body);

    sendResponse(res,{
        statusCode : 200,
        success : true,
        message : `Verifcation code was send by ${user.phoneNumber}`,
        data : {
            email : user.email,
            phone : user.phoneNumber,
            code : user.phoneVerificationCode
        } 
    });
});

const createUserWithPhoneVerificationController = asyncHandler(async(req , res)=>{
    const user = await userServices.createUserWithPhoneVerificationService(req.body);

    sendResponse(res,{
        statusCode : 200,
        success : true,
        message : `Phone verification successfull`,
        data : {
            email : user.email,
            phone : user.phoneNumber,
            isVerifiedEmail : user.isVerifiedEmail,
            isVerifiedPhone : user.isVerifiedPhone
        } 
    });
});


//identity verification controller
const createUserIdentityVerificationController = asyncHandler(async(req , res)=>{
    const user = await userServices.createUserWithIdentityVerificationService(req.body,req.files);
    
    sendResponse(res,{
        statusCode : 200,
        success : true,
        message : 'Identity documents submitted',
        data : user
    });
});

// set password and address
const createUserSetPasswordController = asyncHandler(async(req , res)=>{
    await userServices.createUserSetPasswordService(req.body);
    
    sendResponse(res,{
        statusCode : 200,
        success : true,
        message : 'Password sumited successfull',
        data : null
    });
});


const userProfileUpdateController =asyncHandler(async(req,res)=>{
    const userId = req.user.id;
    const data = await userServices.userProfileUpdateService(userId,req.body);
     sendResponse(res,{
        statusCode : 200,
        success : true,
        message : 'User profile updated',
        data  
    });
})

 


export const userControllers = {
    createUserWithEmailController,
    createUserWithEmailVerificationController,
    createUserWithPhoneController,
    createUserWithPhoneVerificationController,
    createUserIdentityVerificationController,
    createUserSetPasswordController,
    userProfileUpdateController
} 