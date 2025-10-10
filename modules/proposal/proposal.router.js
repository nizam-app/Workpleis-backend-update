import { Router } from "express";
import { proposalControllers } from "./proposal.controllers.js";
import { authentication } from "../../middlewares/authentication.middleware.js";


const proposalRouter = Router();


// create a proposal 
proposalRouter.post('/:id',authentication('ADMIN'),proposalControllers.createProposalController );

// get proposals for a special project 
proposalRouter.get('/:id',authentication('CLIENT','ADMIN'),proposalControllers.getProposalsForSpecialController);

// accept proposal  
proposalRouter.post('/:id/accepted',authentication('CLIENT'),proposalControllers.acceptProposalController);

// reject offer
proposalRouter.post('/:id/rejected',authentication('CLIENT'),proposalControllers.rejectProposalController);





export default proposalRouter;