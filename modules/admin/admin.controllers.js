import User from "../user/user.model.js";
import Job from "../job/job.model.js";
import Special from "../special/special.model.js";

export const getDashboardStats = async (req, res) => {
  try {
    // ✅ 1. Total users (active)
    const activeUsers = await User.countDocuments({ isActive: "ACTIVE" });

    // ✅ 2. Total jobs
    const totalJobs = await Job.countDocuments();

    // ✅ 3. Total special projects
    const totalSpecials = await Special.countDocuments();

    // ✅ 4. Completed vs Cancelled jobs
    const completedJobs = await Job.countDocuments({ status: "Delivered" });
    const cancelledJobs = await Job.countDocuments({ status: "Cancelled" });

    // ✅ 5. Revenue (sum of completed job budgets)
    const completedJobDocs = await Job.find({ status: "Delivered" }, "budget");
    const totalRevenue = completedJobDocs.reduce(
      (acc, job) => acc + (Number(job.budget) || 0),
      0
    );

    // ✅ 6. Monthly user registration (last 6 months)
    const lastSixMonths = new Date();
    lastSixMonths.setMonth(lastSixMonths.getMonth() - 5);

    const monthlyUsers = await User.aggregate([
      { $match: { createdAt: { $gte: lastSixMonths } } },
      {
        $group: {
          _id: { $month: "$createdAt" },
          users: { $sum: 1 },
        },
      },
      { $sort: { "_id": 1 } },
    ]);

    res.status(200).json({
      status: "Success",
      message: "Dashboard stats fetched successfully",
      data: {
        totalJobs,
        totalSpecials,
        activeUsers,
        revenue: totalRevenue,
        jobCompletion: {
          completed: completedJobs,
          cancelled: cancelledJobs,
        },
        userGrowth: monthlyUsers,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "Failed",
      message: "Error fetching dashboard stats",
      error: err.message,
    });
  }
};
