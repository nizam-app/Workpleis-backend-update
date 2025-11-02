import { asyncHandler } from "../../utils/asyncHandler.js";
import { sendResponse } from "../../utils/sendResponse.js";
import { userServices } from "./user.services.js";
import User from "./user.model.js";
import AppError from "../../utils/appError.js";

// email verification
const createUserWithEmailController = asyncHandler(async (req, res) => {

    const user = await userServices.createUserWithEmailService(req.body);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: `Verifcation code was send by ${user.email}`,
        data: {
            email: user.email,
            code: user.emailVerificationCode
        }
    });
});

const createUserWithEmailVerificationController = asyncHandler(async (req, res) => {
    const user = await userServices.createUserWithEmalVerificationService(req.body);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: `Email verification successfull`,
        data: {
            email: user.email,
            isvisVerifiedEmail: user.isVerifiedEmail
        }
    });
});

// phone verification
const createUserWithPhoneController = asyncHandler(async (req, res) => {

    const user = await userServices.createUserWithPhoneService(req.body);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: `Verifcation code was send by ${user.phoneNumber}`,
        data: {
            email: user.email,
            phone: user.phoneNumber,
            code: user.phoneVerificationCode
        }
    });
});

const createUserWithPhoneVerificationController = asyncHandler(async (req, res) => {
    const user = await userServices.createUserWithPhoneVerificationService(req.body);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: `Phone verification successfull`,
        data: {
            email: user.email,
            phone: user.phoneNumber,
            isVerifiedEmail: user.isVerifiedEmail,
            isVerifiedPhone: user.isVerifiedPhone
        }
    });
});


//identity verification controller
const createUserIdentityVerificationController = asyncHandler(async (req, res) => {
    const user = await userServices.createUserWithIdentityVerificationService(req.body, req.files);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Identity documents submitted',
        data: user
    });
});

// set password and address
const createUserSetPasswordController = asyncHandler(async (req, res) => {
    await userServices.createUserSetPasswordService(req.body);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Password sumited successfull',
        data: null
    });
});

// user update 
const userUpdateController = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const data = await userServices.userUpdateService(userId, req.body);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'User profile updated',
        data
    });
});

// user profile picture update
const profilePictureUpdateController = asyncHandler(async (req, res) => {
    const userId = req.user.id;

    const data = await userServices.profilePictureUpdateService(userId, req.file);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'User profile picture updated',
        data
    });
});


// get all user 

const getRequestedUserController = async(req, res) => {
    try {

        const isPhoneValid = await User.find({phoneNumber : true})
        if(!isPhoneValid){
            throw new Error('phone number nai')
        }
        const rquestedUser = await User.find(
        {isVerified : false},
        { name: 1, email: 1, phoneNumber: 1, isVerified: 1, role: 1, subRole: 1, createdAt: 1 },)
        .sort({ createdAt: -1 })
        .lean()
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: 'user data fetching successfully',
            data: rquestedUser
        })
    } catch (error) {
        throw new AppError(500, error.message)
    }
}


export const userControllers = {
    createUserWithEmailController,
    createUserWithEmailVerificationController,
    createUserWithPhoneController,
    createUserWithPhoneVerificationController,
    createUserIdentityVerificationController,
    createUserSetPasswordController,
    userUpdateController,
    profilePictureUpdateController,
    getRequestedUserController
} 