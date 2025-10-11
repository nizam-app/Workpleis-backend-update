import { Router } from "express";
import { authentication } from "../../middlewares/authentication.middleware.js";
import upload from "../../config/multer.config.js";
import { jobDeliveryControllers } from "./delivery.controllers.js";

const deliveryRouter = Router();

//create job delivery 
deliveryRouter.post('/:id', upload.array("files", 5),authentication('SERVICE_PROVIDER'),jobDeliveryControllers.jobDeliveryController);

// needsModification 
deliveryRouter.post('/needs-modification/:id',authentication("CLIENT"),jobDeliveryControllers.jobDeliveryNeedsModificationController);


// needsModification 
deliveryRouter.post('/delivered/:id',authentication("CLIENT"),jobDeliveryControllers.jobDeliveredController);



export default deliveryRouter;