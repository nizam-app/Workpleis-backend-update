import { uploadBufferToCloudinary } from "../../utils/uploadImages.js";
import Special from "./special.model.js";

// Create special project
const createSpecialService = async (payload, userId,files) => {
  const uploadResults = await Promise.all(
     files.map(file => uploadBufferToCloudinary(file.buffer, "photos"))
  );
  
    const urls = uploadResults.map(result => result.secure_url);
  
  
  const specialProject = await Special.create({ ...payload, photos : urls, createdBy: userId });
  return specialProject;
}

// Get all special project (admin)
const getAllSpecialService = async (queries) => {
  const page = parseInt(queries.page) || 1;
  const limit = parseInt(queries.limit) || 10;
  const skip = (page - 1) * limit;

  const query = {};


  if (queries.category) {
    query.category = queries.category;
  }

//   if (queries.minBudget || queries.maxBudget) {
//     query.budget = {};
//     if (queries.minBudget) query.budget.$gte = Number(queries.minBudget);
//     if (queries.maxBudget) query.budget.$lte = Number(queries.maxBudget);
//   }


  const specials = await Special.find(query)
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 })
    .populate("createdBy", "name email profile");

  return { specials, page, limit };
};

// Get special project details
const getSpecialByIdService = async (specialId) => {
  const specialProject = await Special.findById(specialId)
    .populate("createdBy", "name email profile");

  if (!specialProject) throw new AppError(404, "job not found");


  return specialProject;
};

// Get all special projects created by a specific client
const getSpecialsByClientService = async (clientId) => {
  const specialProjects = await Special.find({ createdBy: clientId });
  return specialProjects;
};


// search specials by special title 
const searchSpecialsBySpecialTitleService = async (title) => {
  if (!title) {
    throw new AppError(400, "Search query is required")
  }

  const specials = await Special.find({
    title: { $regex: title, $options: "i" }
  });

  return specials;

};

export const specialProjectServices = {
    createSpecialService,
    getAllSpecialService,
    getSpecialByIdService,
    getSpecialsByClientService,
    searchSpecialsBySpecialTitleService
}