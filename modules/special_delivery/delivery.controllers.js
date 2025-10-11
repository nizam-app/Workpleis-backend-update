import { asyncHandler } from "../../utils/asyncHandler.js";
import { sendResponse } from "../../utils/sendResponse.js";
import { specialDeliveryServices } from "./delivery.services.js";

//special project delivery controller 
const specialDeliveryController = asyncHandler(async (req, res) => {
    const proposalId = req.params.id;
  const delivery = await specialDeliveryServices.specialDeliveryService(
    proposalId,req.body,req.files);

  sendResponse(res,{
           statusCode : 200,
           success : true,
           message : 'Delivery successful',
           data: delivery
       });
});


//special project delivery needsmodification controller 
const specialDeliveryNeedsModificationController = asyncHandler(async (req, res) => {
    const deliveryId = req.params.id;
    const clientId = req.user.id;
    await specialDeliveryServices.specialDeliveryNeedsModificationService(deliveryId,clientId,req.body);

    sendResponse(res,{
            statusCode : 200,
            success : true,
            message : 'Modification submitted',
            data: null
        });
});


// special project delivered controller
const specialDeliveredController = asyncHandler(async (req, res) => {
    const deliveryId = req.params.id;
    const clientId =  req.user.id;
   
    await specialDeliveryServices.specialDeliveredService(deliveryId,clientId);

  sendResponse(res,{
           statusCode : 200,
           success : true,
           message : 'Special Project Delivered',
           data: null
       });
});


export const specialDeliveryControllers ={
    specialDeliveryController,
    specialDeliveryNeedsModificationController,
    specialDeliveredController
}

