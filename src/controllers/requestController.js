import prisma from "../config/prisma.js";

// GET ALL REQUESTS
export const getRequests = async (req, res) => {
  try {

    const requests = await prisma.welfareRequest.findMany({
      include: {
        user: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json(requests);

  } catch (err) {

    res.status(500).json({
      error: err.message,
    });

  }
};

// CREATE REQUEST
export const createRequest = async (req, res) => {
  try {

    const {
      title,
      description,
      amount,
      userId,
    } = req.body;

    const request = await prisma.welfareRequest.create({
      data: {
        title,
        description,
        amount: Number(amount),
        userId: Number(userId),
      },
    });

    res.status(201).json(request);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      error: err.message,
    });

  }
};

// DELETE REQUEST
export const deleteRequest = async (req, res) => {
  try {

    const { id } = req.params;

    await prisma.welfareRequest.delete({
      where: {
        id: Number(id),
      },
    });

    res.json({
      message: "Request deleted",
    });

  } catch (err) {

    res.status(500).json({
      error: err.message,
    });

  }
};