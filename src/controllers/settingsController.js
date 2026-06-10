import prisma from "../config/prisma.js";

const SETTINGS_ID = 1;

// =========================
// GET SETTINGS
// =========================
export const getSettings = async (req, res) => {
  try {
    let settings = await prisma.settings.findUnique({
      where: { id: SETTINGS_ID },
    });

    // If no settings exist, create default one
    if (!settings) {
      settings = await prisma.settings.create({
        data: {
          id: SETTINGS_ID,
          welfareName: "Welfare Management System",
          contributionAmount: 500,
          currency: "KSh",
          theme: "light",
          emailNotifications: true,
          smsNotifications: false,
        },
      });
    }

    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// =========================
// UPDATE SETTINGS
// =========================
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

    const settings = await prisma.settings.upsert({
      where: { id: SETTINGS_ID },
      update: {
        welfareName,
        contributionAmount,
        currency,
        theme,
        emailNotifications,
        smsNotifications,
      },
      create: {
        id: SETTINGS_ID,
        welfareName: welfareName || "Welfare Management System",
        contributionAmount: contributionAmount || 500,
        currency: currency || "KSh",
        theme: theme || "light",
        emailNotifications:
          emailNotifications !== undefined ? emailNotifications : true,
        smsNotifications:
          smsNotifications !== undefined ? smsNotifications : false,
      },
    });

    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};