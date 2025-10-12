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

// get account overview 
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


export const appControllers ={
    getCategoriesController,
    getTopServiceProvidersController,
    getAccountOverviewController
}

