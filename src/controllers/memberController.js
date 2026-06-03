import prisma from "../config/prisma.js";

// ======================
// GET ALL MEMBERS
// ======================
export const getMembers = async (req, res) => {
  try {
    const members = await prisma.user.findMany({
      include: {
        contributions: true,
        requests: true, // ✅ FIX 1: YOU WERE MISSING THIS
      },
    });

    const enrichedMembers = members.map((member) => {
      // TOTAL CONTRIBUTIONS
      const totalContributions = member.contributions.reduce(
        (sum, c) => sum + Number(c.amount),
        0
      );

      // TOTAL APPROVED/DISBURSED REQUESTS
      const totalRequests = member.requests
        .filter(
          (r) =>
            r.status === "Approved" ||
            r.status === "Disbursed"
        )
        .reduce((sum, r) => sum + Number(r.amount), 0);

      // BALANCE = contributions - payouts
      const outstandingBalance =
        totalContributions - totalRequests;

      return {
        id: member.id,
        name: member.name,
        email: member.email,
        phone: member.phone,
        createdAt: member.createdAt,

        totalContributions,
        outstandingBalance, // ✅ FIX 2: now correct
      };
    });

    res.json(enrichedMembers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ======================
// CREATE MEMBER
// ======================
export const createMember = async (req, res) => {
  try {
    const { name, email, phone, role, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "name, email, and password are required",
      });
    }

    const member = await prisma.user.create({
      data: {
        name,
        email,
        phone,
        password,
        role: role || "member",
      },
    });

    res.status(201).json(member);

  } catch (err) {
    console.error("CREATE MEMBER ERROR:", err);

    res.status(500).json({
      error: err.message,
    });
  }
};

// ======================
// UPDATE MEMBER
// ======================
export const updateMember = async (req, res) => {
  try {
    const { id } = req.params;

    const updated = await prisma.user.update({
      where: { id: Number(id) },
      data: req.body,
    });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ======================
// DELETE MEMBER (FIXED)
// ======================
export const deleteMember = async (req, res) => {
  try {
    const { id } = req.params;

    // ✅ FIX 3: delete relations first
    await prisma.contribution.deleteMany({
      where: { userId: Number(id) },
    });

    await prisma.welfareRequest.deleteMany({
      where: { userId: Number(id) },
    });

    await prisma.user.delete({
      where: { id: Number(id) },
    });

    res.json({ message: "Member deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};