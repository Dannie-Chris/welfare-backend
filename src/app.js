import express from "express";
import cors from "cors";

import memberRoutes from "./routes/memberRoutes.js";
import contributionsRoutes from "./routes/contributionsRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import requestRoutes from "./routes/requestRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import activityRoutes from "./routes/activityRoutes.js";
const app = express();

app.use(cors({
  origin: true,
  credentials: true
}));

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/members", memberRoutes);
app.use("/api/contributions", contributionsRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/requests", requestRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/users", userRoutes);
app.use("/api/activity-logs", activityRoutes);
export default app;