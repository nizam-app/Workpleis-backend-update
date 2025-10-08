import { asyncHandler } from "../../utils/asyncHandler.js";
import { deliveryServices } from "./delivery.services.js";

// delivery controller 
const deliveryController = asyncHandler(async (req, res) => {

  const jobs = await deliveryServices.deliveryService(clientId);

  sendResponse(res,{
           statusCode : 200,
           success : true,
           message : 'All jobs retrived for a specific client',
           data: jobs,
       });
});


export const deliveryControllers ={
    deliveryController
}

