import AppError from "../../utils/appError.js";
import { uploadBufferToCloudinary } from "../../utils/uploadImages.js";
import Job from "../job/job.model.js";
import Offer from "../offer/offer.model.js";
import JobDelivery from "./delivery.model.js";


// delivery service 
const jobDeliveryService = async (offerId,serviceProviderId,payload,files) => {
    const {message} = payload;

    const offer = await Offer.findById(offerId).populate('job');

    if(!offer){
      throw new AppError(404,"Offer not found");
    }

    const job = await Job.findById(offer.job._id);

    if(!job){
      throw new AppError(404,"Job not found");
    }

    if(String(job.assignedTo) !== String(serviceProviderId)){
      throw new AppError(401,"You are not authorized to delivery");
    }

    if(job.status !== 'In_progress' ){
      throw new AppError(401,`Job status is ${job.status}`);
    }

    const uploadedFiles = [];

    for (const file of files) {
      const result = await uploadBufferToCloudinary(file.buffer, "deliveries");
      uploadedFiles.push({
        url: result.secure_url,
        format: result.format,
        public_id: result.public_id,
        resource_type: result.resource_type,
      });
    }

    const delivery = await JobDelivery.create({
      job : job._id,
      offer : offer._id,
      message,
      files : uploadedFiles
    });

    job.status = 'In_review';
    await job.save();

  return delivery;

};


// delivery needsModification service 
const jobDeliveryNeedsModificationService = async (deliveryId,clientId,payload) => {
    const {message} = payload;

     const  delivery = await JobDelivery.findById(deliveryId).populate('job'); 

     if(!delivery){
      throw new AppError(404, "Delivery not found");
     }

     const  job = await Job.findById(delivery.job._id);

     if(!job){
      throw new AppError(404,"Job not found");
     }

     if(String(job.createdBy) !== String(clientId)){
      throw new AppError(401,"You are not authorized to needs modification");
    }

    delivery.isDelivered = false;
    delivery.modificationMessage = message;
    await delivery.save();
};


export const jobDeliveryServices = {
    jobDeliveryService,
    jobDeliveryNeedsModificationService
} 