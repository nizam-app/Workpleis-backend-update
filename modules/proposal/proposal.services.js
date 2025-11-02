import AppError from "../../utils/appError.js";
import Special from "../special/special.model.js";
import Proposal from "./proposal.model.js";



// Submit a proposal
const createProposalService = async (specialId, payload) => {
  const special = await Special.findById(specialId);

  if (!special) throw new AppError(404, "Special project not found");
   
  // Allow proposals only when status is 'Submitted' or 'Proposal_Sent'
  if (special.status !== "Submitted" && special.status !== "Proposal_Sent") {
    throw new AppError(
      400,
      `You cannot send a proposal. Special project status is currently '${special.status}'.`
    );
  }

  const proposal = await Proposal.create({
    special : special._id,
    ...payload,
  });

  special.status = "Proposal_Sent";
  await special.save();

  return proposal;
};

// Get proposals for a special
const getProposalsForSpecialService = async (specialId) => {

  const special = await Special.findById(specialId);
  if (!special){
     throw new AppError(404, "Special project not found");
  }

  const proposals = await Proposal.find({ special : special._id })
    .sort({ createdAt: -1 });

  return proposals;
};

// Accept proposal (only client can accept proposal)
const acceptProposalService = async (proposalId, clientId) => {
   
  const proposal = await Proposal.findById(proposalId).populate("special");
   
  if (!proposal) {
    throw new AppError(404, "Proposal not found");
  }
if(proposal.status === "Rejected"){
    throw new AppError(401, "This proposal is already Rejected");
  }
  const special = proposal.special;

    // Check if client owns the special project
  if (String(special.createdBy) !== String(clientId)) {
    throw new AppError(401, "You are Not authorized to accept this Proposal");
  }

  // Ensure the special project is still send proposal
  if (special.status !== "Proposal_Sent") {
    throw new AppError(400, `Cannot accept proposal. Special project is '${special.status}'.`);
  }

  // Update the selected proposal
  proposal.status = "Accepted";
  await proposal.save();
   
  // Mark special project as In_Progress
  special.status = "In_Progress";
  await special.save();
};

// Reject proposal (only client can reject an proposal)
const rejectProposalService = async (proposalId, clientId,message) => {
   const proposal = await Proposal.findById(proposalId).populate("special");
   
  if (!proposal) {
    throw new AppError(404, "Proposal not found");
  }

  if(proposal.status === "Accepted"){
    throw new AppError(401, "This proposal is already accepted");
  } 

  const special = proposal.special;

// Check if client owns the special project
  if (String(special.createdBy) !== String(clientId)) {
    throw new AppError(401, "You are Not authorized to accept this Proposal");
  }

  // Update the selected proposal
  proposal.status = "Rejected";
  proposal.rejectionmessage = message;
  await proposal.save();
};





export const proposalServices = {
    createProposalService,
    getProposalsForSpecialService,
    acceptProposalService,
    rejectProposalService
}