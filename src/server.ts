import mongoose from "mongoose";
import config from "./config/index";
import app from "./app";
const db = async () => {
  try {
    await mongoose.connect(config.databaseUrl as string);
    console.log("Connected to MongoDB");
    app.listen(config.port, () => {
      console.log(`Server is running on port ${config.port}`);
    });
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
  }
};
db();
