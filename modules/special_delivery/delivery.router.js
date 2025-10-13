import { Router } from "express";
import upload from "../../config/multer.config.js";
import { authentication } from "../../middlewares/authentication.middleware.js";
import { specialDeliveryControllers } from "./delivery.controllers.js";


const specialDeliveryRouter = Router();

//create job delivery 
specialDeliveryRouter.post('/:id', upload.array("files", 5),authentication('ADMIN'),specialDeliveryControllers.specialDeliveryController);

// needsModification 
specialDeliveryRouter.post('/needs-modification/:id',authentication("CLIENT"),specialDeliveryControllers.specialDeliveryNeedsModificationController);


// Delivered
specialDeliveryRouter.post('/delivered/:id',authentication("CLIENT"),specialDeliveryControllers.specialDeliveredController);


export default specialDeliveryRouter;