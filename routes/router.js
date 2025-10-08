import { Router } from "express";
import userRouter from "../modules/user/user.router.js";
import authRouter from "../modules/auth/auth.router.js";
import jobRouter from "../modules/job/job.router.js";
import offerRouter from "../modules/offer/offer.router.js";
import reviewRouter from "../modules/review/review.router.js";
import deliveryRouter from "../modules/delivery/delivery.router.js";

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
        path : '/delivery',
        route : deliveryRouter
    },
]


routes.forEach((route)=>{
    router.use(route.path, route.route);
})
