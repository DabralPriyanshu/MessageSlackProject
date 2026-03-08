import mongoose from "mongoose";
import ENV from "./serverConfig.js";
export default async function connectDB() {
  try {
    if (ENV.NODE_ENV == "development") {
      await mongoose.connect(ENV.DEV_DB_URL);
    } else {
      await mongoose.connect(ENV.PROD_DB_URL);
    }
    console.log("DB Connected !!!");
  } catch (error) {
    console.log("Error connecting DB!!!", error);
    process.exit(1);
  }
}
