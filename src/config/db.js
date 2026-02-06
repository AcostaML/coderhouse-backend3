import mongoose from "mongoose";

export async function connectDB() {
  const MONGO_URL = process.env.MONGO_URL;

  if (!MONGO_URL) {
    console.error("❌ Missing MONGO_URL in .env");
    process.exit(1);
  }

  try {
    await mongoose.connect(MONGO_URL, {
      dbName: "coderhouse-backend3"
    });
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  }
}
