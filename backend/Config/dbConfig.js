import mongoose from "mongoose";
import { Config } from "./envConfig.js";

export const connectDB = async () => {
  try {
    const result = await mongoose.connect(Config.DB_URL);
    console.log(`Connected to Database` + result.connection.host);
  } catch (error) {
      console.log(`Failed to connected to Database   ` + error.message);
      process.exit(1)
  }
};
