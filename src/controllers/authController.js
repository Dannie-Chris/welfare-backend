import prisma from "../config/prisma.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// REGISTER
export const register = async (req, res) => {
  try {
    console.log("REGISTER BODY:", req.body);

    const { name, email, password, phone } = req.body || {};

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email and password are required"
      });
    }

    const exists = await prisma.user.findUnique({
      where: { email }
    });

    if (exists) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        phone,
        password: hashedPassword,
        role: req.body.role || "member"
      }
    });

    return res.status(201).json({
      message: "User registered successfully",
      user
    });

  } catch (err) {
    return res.status(500).json({
      message: err.message
    });
  }
};

// LOGIN
export const login = async (req, res) => {
  try {
    console.log("LOGIN BODY:", req.body);

    const { email, password } = req.body || {};

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password required"
      });
    }

    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid password"
      });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (err) {
    return res.status(500).json({
      message: err.message
    });
  }
};