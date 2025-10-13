import mongoose from "mongoose";
import Job from "../job/job.model.js";
import Review from "../review/review.model.js";
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


// account overview(client)
const accountOverViewService = async (userId) => {

   const user = await User.findById(userId);
  
  let totalJobs;
  let pendingJobs;

   if(user.role === 'SERVICE_PROVIDER'){
       totalJobs = await Job.find({
        assignedTo : userId
     }).countDocuments();
      pendingJobs = await Job.find({
        assignedTo : userId,
        status : {$ne : "Delivered"}
     }).countDocuments();
    }

   if(user.role === 'CLIENT'){
       totalJobs = await Job.find({
        createdBy : userId
     }).countDocuments();
      pendingJobs = await Job.find({
        createdBy : userId,
        status : {$ne : "Delivered"}
     }).countDocuments();
    }


     

    return {
        totalJobs,
        pendingJobs
    };
}

// get profile details
const getProfileDetailsPublicService = async (userId) => {

    const {totalJobs,pendingJobs} = await accountOverViewService(userId);
     
    const profile = await User.findById(userId);
    const totalReview = await Review.find({to : userId}).countDocuments();
    return {
        totalJobs,
        pendingJobs,
        picture : profile.profile,
        totalReview,
        ratings : profile.ratings,
        bio : profile.bio,
        about : {
          location : profile.address,
          languages : profile.languages,
          memberSince : profile.createdAt
        }
    };
}

// get rating and reviews
const getRatingsAndReviewsService = async (userId) => {
    const reviewStats = await Review.aggregate([
  {
    $match: { to: new mongoose.Types.ObjectId(String(userId)) },
  },
  {
    $group: {
      _id: "$to",
      totalReviews: { $sum: 1 },
      averageRating: { $avg: "$rating" },
      ratings: { $push: "$rating" },
    },
  },
  {
    $project: {
      _id: 0,
      totalReviews: 1,
      averageRating: { $round: ["$averageRating", 1] },
      ratingCounts: {
        1: { $size: { $filter: { input: "$ratings", as: "r", cond: { $eq: ["$$r", 1] } } } },
        2: { $size: { $filter: { input: "$ratings", as: "r", cond: { $eq: ["$$r", 2] } } } },
        3: { $size: { $filter: { input: "$ratings", as: "r", cond: { $eq: ["$$r", 3] } } } },
        4: { $size: { $filter: { input: "$ratings", as: "r", cond: { $eq: ["$$r", 4] } } } },
        5: { $size: { $filter: { input: "$ratings", as: "r", cond: { $eq: ["$$r", 5] } } } },
      },
    },
  },
]);

const allReviews = await Review.find({ to: userId })
  .populate("from", "name profile")
  .sort({ createdAt: -1 });  

  return{
    reviewStats,
    allReviews
  }
}

// contact with admin
const contactService = async (userId,payload) => {
  const {category, subject, message} = payload;
  // here the message will send to the admin email 
}




export const appServices = {
    getCategoriesService,
    getTopServiceProvidersService,
    accountOverViewService,
    getProfileDetailsPublicService,
    getRatingsAndReviewsService,
    contactService
}