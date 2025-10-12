import Job from "../job/job.model.js";
import User from "../user/user.model.js";

// get categories
const getCategoriesService = async () => {
   
   const categories = await Job.aggregate([
      {
        $group: {
          _id: "$category",          // group by category name
          totalJobs: { $sum: 1 }     // count how many jobs in each category
        }
      },
      {
        $project: {
          _id: 0,                    // remove MongoDB _id field
          category: "$_id",          // rename _id to category
          totalJobs: 1
        }
      },
      {
        $sort: { totalJobs: -1 }     // optional: sort by number of jobs (descending)
      }
    ]);
  return categories;
}


// get top service provider
const getTopServiceProvidersService = async () => {
   
    const topServiceProviders = await User.find(
        { role: "SERVICE_PROVIDER" },      
        { profile: 1, name: 1, designation: 1, ratings: 1, _id: 1 }  
    ).sort({ ratings: -1 });

    return topServiceProviders;
}


// account overview
const accountOverViewService = async (userId) => {
   
     const totalJobs = await Job.find({
        createdBy : userId
     }).countDocuments();
     const pendingJobs = await Job.find({
        createdBy : userId,
        status : {$ne : "Delivered"}
     }).countDocuments();

    return {
        totalJobs,
        pendingJobs
    };
}




export const appServices = {
    getCategoriesService,
    getTopServiceProvidersService,
    accountOverViewService
}