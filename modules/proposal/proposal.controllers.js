import { asyncHandler } from "../../utils/asyncHandler.js";
import { sendResponse } from "../../utils/sendResponse.js";
import { proposalServices } from "./proposal.services.js";


// admin submits proposal
const createProposalController = asyncHandler(async (req, res) => {
const specilaId = req.params.id;

  const proposal = await proposalServices.createProposalService(
    specilaId,
    req.body
  );


  sendResponse(res,{
             statusCode : 201,
             success : true,
             message : 'Proposal submited',
             data: proposal,
         });
});

// Get proposals for a special
const getProposalsForSpecialController = asyncHandler(async (req, res) => {
  const specialId = req.params.id;
  const specials = await  proposalServices.getProposalsForSpecialService(specialId);
  sendResponse(res,{
              statusCode : 200,
              success : true,
              message : 'All proposals retrived',
              data: specials,
              meta : {
                count: specials.length
            }

          });
  });

// client accepts a proposal 
const acceptProposalController = asyncHandler(async (req, res) => {
  const proposalId = req.params.id;
  const clientId = req.user.id;

  await  proposalServices.acceptProposalService(proposalId,clientId);

sendResponse(res,{
             statusCode : 200,
             success : true,
             message : 'Proposal Accepted',
             data : null 
         });
});

// client rejects an proposal
const rejectProposalController = asyncHandler(async (req, res) => {
  const proposalId = req.params.id;
  const clientId = req.user.id;
  const {message} = req.body;

  await proposalServices.rejectProposalService(proposalId,clientId,message);

  sendResponse(res,{
             statusCode : 200,
             success : true,
             message : 'Proposal rejected',
             data:  null
         });
});

// job started
const startedJobController = asyncHandler(async (req, res) => {
  const offerId = req.params.id;
  const serviceProviderId = req.user.id;
 
  await offerservices.startedJobService(offerId,serviceProviderId);
  sendResponse(res,{
           statusCode : 200,
           success : true,
           message : 'Job started',
           data: null
       });
});



export const proposalControllers ={
    createProposalController,
    getProposalsForSpecialController,
    acceptProposalController,
    rejectProposalController
}