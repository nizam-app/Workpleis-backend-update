import { envLoader } from "../config/envs.js";
import AppError from "./appError.js";

export const globalErrorHandle = (err  , req , res , next)=>{
    let statusCode = 500;
    let message = `Something went wrong!`;

    //mongoose duplicate error
    if(err.code === 11000){
        statusCode = 400;
        const duplicate = err.message.match(/"([^"]*)"/)[1];
        message = `${duplicate} already exist!`
    }
    //mongoose CastError 
    else if(err.name === 'CastError'){
        statusCode = 400;
        message = 'Invalid mongoDB object ID, Please provide valid ID.'
    }
    //mongoose ValidationError
    else if(err.name === "ValidationError"){
        statusCode = 400;
        message = "Invalid Input"
    }
    // here will be add a zod error

    // custom error 
    else if(err instanceof AppError){
        statusCode = err.statusCode;
        message = err.message;
    }
    // server error 
    else if(err instanceof Error){
        statusCode = 500;
        message = err.message;
    }
    
    res.status(statusCode).json({
        status : 'Failed',
        message,
        err,
        stack : envLoader.NODE_ENV === 'development' ? err.stack : null
    })
}