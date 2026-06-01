import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


// GET ALL CONTRIBUTIONS
export const getContributions = async (req, res) => {
  try {
    const contributions = await prisma.contribution.findMany({
      include: {
        user: true, // fetch member details
      },
    });

    res.json(contributions);

  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to fetch contributions",
    });
  }
};


// CREATE CONTRIBUTION
export const createContribution = async (req, res) => {
  try {
    const {
      userId,
      month,
      year,
      amount,
      paymentStatus,
      paymentMethod,
      reference,
    } = req.body;

    const contribution = await prisma.contribution.create({
      data: {
        month,
        year,
        amount,
        paymentStatus,
        paymentMethod,
        reference,
        user: {
          connect: { id: userId },
        },
      },
    });

    // 🔥 UPDATE MEMBER BALANCE HERE
    await prisma.user.update({
      where: { id: userId },
      data: {
        outstandingBalance: {
          increment: amount,
        },
        totalContributions: {
          increment: amount,
        },
      },
    });

    res.status(201).json(contribution);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create contribution" });
  }
};

// DELETE CONTRIBUTION
export const deleteContribution = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.contribution.delete({
      where: {
        id: Number(id),
      },
    });

    res.json({
      message: "Contribution deleted successfully",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to delete contribution",
    });
  }
};