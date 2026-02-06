import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import { buildApp } from "./app.js";

dotenv.config();

const PORT = process.env.PORT || 8080;

(async () => {
  await connectDB();
  const app = buildApp();
  app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
  });
})();
