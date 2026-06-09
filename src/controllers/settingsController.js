import prisma from "../config/prisma.js";

export const getSettings = async (req, res) => {
  try {
    let settings = await prisma.settings.findFirst();

    if (!settings) {
      settings = await prisma.settings.create({
        data: {},
      });
    }

    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateSettings = async (req, res) => {
  try {
    const {
      welfareName,
      contributionAmount,
      currency,
      theme,
      emailNotifications,
      smsNotifications,
    } = req.body;

    let settings = await prisma.settings.findFirst();

    if (!settings) {
      settings = await prisma.settings.create({
        data: {
          welfareName,
          contributionAmount,
          currency,
          theme,
          emailNotifications,
          smsNotifications,
        },
      });
    } else {
      settings = await prisma.settings.update({
        where: { id: settings.id },
        data: {
          welfareName,
          contributionAmount,
          currency,
          theme,
          emailNotifications,
          smsNotifications,
        },
      });
    }

    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};