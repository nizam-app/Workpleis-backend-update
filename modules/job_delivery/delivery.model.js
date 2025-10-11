import mongoose from "mongoose";



export const deliveryFile = new mongoose.Schema({
  url: String,
  format: String,
  public_id: String,
  resource_type: String,
},{timestamps : false, versionKey : false, _id : false})


const jobDeliverSchema = new mongoose.Schema(
  {
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
    offer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Offer",
      required: true,
    },
    message: {
      type: String,
      trim : true
    },
    files: {
      type:  [deliveryFile]
    },
    isDelivered : {
      type : String,
      enum : ["Pending","Needs_Modification","Delivered"],
      default : "Pending"
    },
    modificationMessage : {
      type : String
    }
  },
  { timestamps: true, versionKey: false }
);

const JobDelivery = mongoose.model("JobDelivery", jobDeliverSchema);

export default JobDelivery;


