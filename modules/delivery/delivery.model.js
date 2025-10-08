import mongoose from "mongoose";

const deliverSchema = new mongoose.Schema(
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
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    files: {
      type: String
    },
  },
  { timestamps: true, versionKey: false }
);

const Delivery = mongoose.model("Delivery", deliverSchema);

export default Delivery;


