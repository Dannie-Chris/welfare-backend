import prisma from "../config/prisma.js";

// GET ALL ACTIVITY LOGS
export const getActivityLogs = async (req, res) => {
  try {
    const logs = await prisma.activityLog.findMany({
      include: {
        user: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.json(logs);
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

// CREATE LOG (optional manual use)
export const createActivityLog = async (req, res) => {
  try {
    const { action, entityType, details, userId } = req.body;

    const log = await prisma.activityLog.create({
      data: {
        action,
        entityType,
        details,
        userId,
        ipAddress: req.ip,
      },
    });

    return res.status(201).json(log);
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};