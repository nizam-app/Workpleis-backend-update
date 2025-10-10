import mongoose from "mongoose";

const proposalSchema = new mongoose.Schema(
  {
    special: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Special",
      required: true,
    },
    price: {
      type: Number,
      required: [true, "Proposal price is required"],
      min: [1, "Proposal must be greater than 0"],
    },
    message: {
      type: String
    },
    completionTime: {
      type: String,  
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Accepted", "Rejected"],
      default: "Pending",
    },
    rejectionmessage: {
      type: String
    }
  },
  { timestamps: true, versionKey : false }
);

const Proposal = mongoose.model("Proposal", proposalSchema);

export default Proposal;