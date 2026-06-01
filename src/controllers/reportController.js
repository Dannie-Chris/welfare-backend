import prisma from "../config/prisma.js";

export const getReports = async (req, res) => {
  try {

    const totalBeneficiaries = await prisma.user.count();

    const totalApplications = await prisma.welfareRequest.count();

    const approvedApplications =
      await prisma.welfareRequest.count({
        where: {
          status: "approved",
        },
      });

    const contributions =
      await prisma.contribution.aggregate({
        _sum: {
          amount: true,
        },
      });

    const totalDisbursed =
      contributions._sum.amount || 0;

    const approvalRate =
      totalApplications > 0
        ? Math.round(
            (approvedApplications / totalApplications) * 100
          )
        : 0;

    res.json({
      totalBeneficiaries,
      totalApplications,
      approvedApplications,
      totalDisbursed,
      approvalRate,

      // charts
      programPerformance: [],

      quarterlyTrend: [],
    });

  } catch (err) {

    res.status(500).json({
      error: err.message,
    });

  }
};