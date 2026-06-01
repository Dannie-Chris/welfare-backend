import prisma from "../config/prisma.js";

// GET ALL LOGS
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

    res.json(logs);

  } catch (err) {

    res.status(500).json({
      error: err.message,
    });

  }
};

// CREATE LOG
export const createActivityLog = async (req, res) => {
  try {

    const {
      action,
      entityType,
      entityId,
      details,
      userId,
      ipAddress,
    } = req.body;

    const log = await prisma.activityLog.create({
      data: {
        action,
        entityType,
        entityId,
        details,
        userId: Number(userId),
        ipAddress,
      },
    });

    res.status(201).json(log);

  } catch (err) {

    res.status(500).json({
      error: err.message,
    });

  }
};

// DELETE LOG
export const deleteActivityLog = async (req, res) => {
  try {

    const { id } = req.params;

    await prisma.activityLog.delete({
      where: {
        id: Number(id),
      },
    });

    res.json({
      message: "Log deleted",
    });

  } catch (err) {

    res.status(500).json({
      error: err.message,
    });

  }
};