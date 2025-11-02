import { Router } from "express";
import userRouter from "../modules/user/user.router.js";
import authRouter from "../modules/auth/auth.router.js";
import jobRouter from "../modules/job/job.router.js";
import offerRouter from "../modules/offer/offer.router.js";
import reviewRouter from "../modules/review/review.router.js";

import specialRouter from "../modules/special/special.router.js";
import proposalRouter from "../modules/proposal/proposal.router.js";
import deliveryRouter from "../modules/job_delivery/delivery.router.js";
import specialDeliveryRouter from "../modules/special_delivery/delivery.router.js";
import bankAccountRouter from "../modules/bankAccount/bank.router.js";
import appRouter from "../modules/app/app.router.js";
import adminRouter  from "../modules/admin/admin.router.js"

export const router  = Router();


const routes = [
    {
        path : '/user',
        route : userRouter
    },
    {
        path : '/auth',
        route : authRouter
    },
    {
        path : '/jobs',
        route : jobRouter
    },
    {
        path : '/offers',
        route : offerRouter
    },
    {
        path : '/reviews',
        route : reviewRouter
    },
    {
        path : '/special-projects',
        route : specialRouter
    },
    {
        path : '/proposals',
        route : proposalRouter
    },
    {
        path : '/job-delivery',
        route : deliveryRouter
    },
    {
        path : '/special-project-delivery',
        route : specialDeliveryRouter
    },
    {
        path : '/bank-account',
        route : bankAccountRouter
    },
    {
        path : '/app',
        route : appRouter
    },
    {
        path: '/admin',
        route :  adminRouter 
    }


]


routes.forEach((route)=>{
    router.use(route.path, route.route);
})
