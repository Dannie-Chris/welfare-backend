import express from "express";
import {
  getActivityLogs,
  createActivityLog,
} from "../controllers/activityController.js";

const router = express.Router();

// GET ALL LOGS
router.get("/", getActivityLogs);

// OPTIONAL: CREATE LOG MANUALLY
router.post("/", createActivityLog);

export default router;