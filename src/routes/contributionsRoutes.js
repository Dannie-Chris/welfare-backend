import express from "express";

import {
  getContributions,
  createContribution,
  deleteContribution,
} from "../controllers/contributionController.js";

const router = express.Router();

// GET ALL
router.get("/", getContributions);

// CREATE
router.post("/", createContribution);

// DELETE
router.delete("/:id", deleteContribution);

export default router;