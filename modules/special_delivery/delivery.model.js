import mongoose from "mongoose";

export const deliveryFile = new mongoose.Schema({
  url: String,
  format: String,
  public_id: String,
  resource_type: String,
},{timestamps : false, versionKey : false, _id : false})


const specialDeliverSchema = new mongoose.Schema(
  {
    special: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Special",
      required: true,
    },
    proposal: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Proposal",
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

const SpecialDelivery = mongoose.model("SpecialDelivery", specialDeliverSchema);

export default SpecialDelivery;


