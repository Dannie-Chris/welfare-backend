import prisma from "../config/prisma.js";

export const getDashboardStats = async (req, res) => {
  try {
    // TOTAL MEMBERS
    const totalMembers = await prisma.user.count();

    // TOTAL CONTRIBUTIONS
    const contributions = await prisma.contribution.aggregate({
      _sum: {
        amount: true,
      },
    });

    // TOTAL REQUESTS
    const totalRequests = await prisma.welfareRequest.count();

    // PENDING REQUESTS
    const pendingRequests = await prisma.welfareRequest.count({
      where: {
        status: "pending",
      },
    });

    // APPROVED REQUESTS
    const approvedRequests = await prisma.welfareRequest.count({
      where: {
        status: "Approved",
      },
    });

    res.json({
      totalMembers,
      totalContributions: contributions._sum.amount || 0,
      totalRequests,
      pendingRequests,
      approvedRequests,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};