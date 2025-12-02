import mongoose from "mongoose";

let isConnected = false;

export async function connectToDB() {
  if (isConnected) return;

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI is missing in environment variables");
  }

  await mongoose.connect(uri, {
    dbName: "projects_db",
  });

  isConnected = true;
  console.log("MongoDB connected");
}
