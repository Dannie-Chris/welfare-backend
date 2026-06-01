import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET USERS
export const getUsers = async (req, res) => {
  try {

    const users = await prisma.user.findMany();

    res.json(users);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error: "Failed to fetch users",
    });

  }
};