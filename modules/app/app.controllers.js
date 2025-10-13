import { asyncHandler } from "../../utils/asyncHandler.js";
import { sendResponse } from "../../utils/sendResponse.js";
import { appServices } from "./app.services.js";



// get category name with total jobs
const getCategoriesController = asyncHandler(async(req,res)=>{

    const categories = await appServices.getCategoriesService();
    sendResponse(res,{
            statusCode : 200,
            success : true,
            message : 'Gategories Retrived',
            data : categories
        });
});


// get top sevice provider 
const getTopServiceProvidersController = asyncHandler(async(req,res)=>{
    const categories = await appServices.getTopServiceProvidersService();
    sendResponse(res,{
            statusCode : 200,
            success : true,
            message : 'Gategories Retrived',
            data : categories
        });
});

// get account overview(client) 
const getAccountOverviewController = asyncHandler(async(req,res)=>{
    const userId = req.user.id;
    const overview = await appServices.accountOverViewService(userId);
    sendResponse(res,{
            statusCode : 200,
            success : true,
            message : 'Account Overview Retrived',
            data : overview
        });
});


// get account overview(client) 
const getProfileDetailsPublicController = asyncHandler(async(req,res)=>{
    const userId = req.params.id;
    const details = await appServices.getProfileDetailsPublicService(userId);
    sendResponse(res,{
            statusCode : 200,
            success : true,
            message : 'Profile deitails Retrived',
            data : details
        });
});

// get ratings and reviews
const getRatingsAndReviewsController = asyncHandler(async(req,res)=>{
    const userId = req.params.id;
    const details = await appServices.getRatingsAndReviewsService(userId);
    sendResponse(res,{
            statusCode : 200,
            success : true,
            message : 'Profile deitails Retrived',
            data : details
        });
});


// contact with admin
const contactController = asyncHandler(async(req,res)=>{
    const userId = req.user.id;
    await appServices.contactService(userId,req.body);
    sendResponse(res,{
            statusCode : 200,
            success : true,
            message : 'Sent message',
            data : null
        });
});


export const appControllers ={
    getCategoriesController,
    getTopServiceProvidersController,
    getAccountOverviewController,
    getProfileDetailsPublicController,
    getRatingsAndReviewsController
}

