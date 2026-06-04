import express from "express";

import {
  getRequests,
  createRequest,
  deleteRequest,
  updateRequestStatus,
} from "../controllers/requestController.js";

const router = express.Router();

router.get("/", getRequests);

router.post("/", createRequest);

router.delete("/:id", deleteRequest);

router.patch("/:id/status", updateRequestStatus);

export default router;