import express from "express";

import {
  getActivityLogs,
  createActivityLog,
  deleteActivityLog,
} from "../controllers/activityController.js";

const router = express.Router();

router.get("/", getActivityLogs);

router.post("/", createActivityLog);

router.delete("/:id", deleteActivityLog);

export default router;