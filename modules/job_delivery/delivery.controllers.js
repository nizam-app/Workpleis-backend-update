import { asyncHandler } from "../../utils/asyncHandler.js";
import { sendResponse } from "../../utils/sendResponse.js";
import {jobDeliveryServices } from "./delivery.services.js";

//job delivery controller 
const jobDeliveryController = asyncHandler(async (req, res) => {
    const offerId = req.params.id;
    const serviceProviderId =  req.user.id;
  const delivery = await jobDeliveryServices.jobDeliveryService(offerId,serviceProviderId,req.body,req.files);

  sendResponse(res,{
           statusCode : 200,
           success : true,
           message : 'Delivery successful',
           data: delivery,
       });
});


//job delivery needsmodification controller 
const jobDeliveryNeedsModificationController = asyncHandler(async (req, res) => {
    const deliveryId = req.params.id;
    const clientId =  req.user.id;
    console.log(req.body);
    await jobDeliveryServices.jobDeliveryNeedsModificationService(deliveryId,clientId,req.body);

  sendResponse(res,{
           statusCode : 200,
           success : true,
           message : 'Modification submitted',
           data: null
       });
});


export const jobDeliveryControllers ={
    jobDeliveryController,
    jobDeliveryNeedsModificationController
}

