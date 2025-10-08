import { Router } from "express";
import { deliveryControllers } from "./delivery.controllers.js";
import { authentication } from "../../middlewares/authentication.middleware.js";

const deliveryRouter = Router();

//create delivery 
deliveryRouter.post('/',authentication('SERVICE_PROVIDER','ADMIN'), deliveryControllers.deliveryController);




export default deliveryRouter;