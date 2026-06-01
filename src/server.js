import dotenv from "dotenv";
import app from "./app.js";
import contributionsRoutes from "./routes/contributionsRoutes.js";

app.use("/api/contributions", contributionsRoutes);

dotenv.config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});