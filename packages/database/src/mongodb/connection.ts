import mongoose from "mongoose";
import { env } from "../config/env";

export async function connectDB() {
  try {
    await mongoose.connect(env.MONGODB_URL, {
      autoIndex: true,
    });
    mongoose.connection.on("error", (err) => {
      console.error(`MongoDB connection error: ${err}`);
    });
  } catch (err) {
    console.error(`Error connecting to MongoDB: ${err}`);
    process.exit(1);
  }
}

export async function disconnectDB() {
  await mongoose.disconnect();
}
