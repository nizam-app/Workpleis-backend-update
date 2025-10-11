import Proposal from '../proposal/proposal.model.js';
import AppError from '../../utils/appError.js';
import {Special} from '../special/special.model.js';
import { uploadBufferToCloudinary } from '../../utils/uploadImages.js';
import SpecialDelivery from './delivery.model.js';

//special project delivery service 
const specialDeliveryService = async (proposalId,payload,files) => {
    const {message} = payload; 

    const proposal = await Proposal.findById(proposalId).populate('special');

    if(!proposal){
      throw new AppError(404,"Proposal not found");
    }

    if(proposal.status !== "Accepted"){
      throw new AppError(401,`Proposal status is ${proposal.status}`);
    }

    const special = await Special.findById(proposal.special._id);

    if(!special){
      throw new AppError(404,"Special not found");
    }
    
    if(special.status !== 'In_Progress' && special.status !== 'In_Review'){
      throw new AppError(401,`Special status is ${special.status}`);
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

    const delivery = await SpecialDelivery.create({
      special : special._id,
      proposal : proposal._id,
      message,
      files : uploadedFiles
    });

    special.status = 'In_Review';
    await special.save();

  return delivery;

};

//special project delivery needsModification service 
const specialDeliveryNeedsModificationService = async (deliveryId,clientId,payload) => {
    const {message} = payload;

     const  delivery = await SpecialDelivery.findById(deliveryId).populate('special'); 

     if(!delivery){
      throw new AppError(404, "Delivery not found");
     }

     const  special = await Special.findById(delivery.special._id);

     if(!special){
      throw new AppError(404,"Special not found");
     }
     
    if(String(special.createdBy) !== String(clientId)){
      throw new AppError(401,"You are not authorized to needs modification");
    }

    if(special.status !== 'In_Review'){
      throw new AppError(401,`Special status is ${special.status}`);
    }

    delivery.isDelivered = "Needs_Modification";
    delivery.modificationMessage = message;
    await delivery.save();
};

// delivered service 
const specialDeliveredService = async (deliveryId,clientId) => {
     
     const delivery = await SpecialDelivery.findById(deliveryId).populate('special'); 

     if(!delivery){
      throw new AppError(404, "Delivery not found");
     }

     if(delivery.isDelivered !== "Pending"){
      throw new AppError(404, `Delivery status ${delivery.isDelivered}`);
     }

     const  special = await Special.findById(delivery.special._id);

     if(!special){
      throw new AppError(404,"Special not found");
     }

     if(String(special.createdBy) !== String(clientId)){
      throw new AppError(401,"You are not authorized to Delivered the special project");
    }

    if(special.status !== 'In_Review'){
      throw new AppError(401,`Special status is ${special.status}`);
    }

    delivery.isDelivered = "Delivered";
    await delivery.save();
};


export const specialDeliveryServices = {
    specialDeliveryService,
    specialDeliveryNeedsModificationService,
    specialDeliveredService
} 