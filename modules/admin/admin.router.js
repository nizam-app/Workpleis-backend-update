import {Router} from "express";
import { getDashboardStats } from "./admin.controllers.js";
import { authentication } from "../../middlewares/authentication.middleware.js";

const adminRouter = Router();

adminRouter.get("/dashboard-stats", authentication('ADMIN'), getDashboardStats);



export default adminRouter;
