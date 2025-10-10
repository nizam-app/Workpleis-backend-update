import { asyncHandler } from "../../utils/asyncHandler.js";
import { sendResponse } from "../../utils/sendResponse.js";
import { specialProjectServices } from "./special.services.js";


// Create special project
const createSpecialController = asyncHandler(async (req, res) => {
  const clientId = req.user.id;

  const specialProject = await  specialProjectServices.createSpecialService(req.body, clientId,req.files);
   sendResponse(res,{
           statusCode : 201,
           success : true,
           message : 'Special project created',
           data : specialProject
       });
});

// Get all jobs (admin)
const getAllSpecialsController = asyncHandler(async (req, res) => {
     
  const data = await specialProjectServices.getAllSpecialService(req.query);
 
   sendResponse(res,{
           statusCode : 200,
           success : true,
           message : 'All special projects retrived',
           data : data.specials,
           meta : {
            limit : data.limit,
            page : data.page
            }
       });
});

// Get special project details
const getSpecialDetailsController = asyncHandler(async (req, res) => {
  const specialId = req.params.id;
  const specialProject = await specialProjectServices.getSpecialByIdService(specialId);
  sendResponse(res,{
           statusCode : 200,
           success : true,
           message : 'Special project retrived',
           data : specialProject
       });
});

// Get my special projects
const getSpecialsByClientController = asyncHandler(async (req, res) => {
  const clientId = req.user.id;

  const specialProjects = await specialProjectServices.getSpecialsByClientService(clientId);

  sendResponse(res,{
           statusCode : 200,
           success : true,
           message : 'All special projects retrived for a specific client',
           data: specialProjects,
           meta : {
            count : specialProjects.length
           }
       });
});

// Get special projects for a client 
const getSpecialsForClientController = asyncHandler(async (req, res) => {
  const clientId = req.params.id;
  const specialProjects = await specialProjectServices.getSpecialsByClientService(clientId);

  sendResponse(res,{
           statusCode : 200,
           success : true,
           message : 'All special projects retrived for a specific client',
           data: specialProjects,
           meta : {
            count : specialProjects.length
           }
       });
});

// search by job title 
const searchSpecialsByTitleController = asyncHandler(async (req, res) => {
  const { title } = req.query;

  const data = await specialProjectServices.searchSpecialsBySpecialTitleService(title);
  sendResponse(res,{
           statusCode : 200,
           success : true,
           message : 'Search special projects retrived',
           data: data,
           meta : {
            count : data.length
           }
       });
});



export const specialProjectControllers = {
    createSpecialController,
    getAllSpecialsController,
    getSpecialDetailsController,
    getSpecialsByClientController,
    getSpecialsForClientController,
    searchSpecialsByTitleController
}