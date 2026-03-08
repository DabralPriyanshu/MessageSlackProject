import env from "dotenv";
env.config({ quiet: true });
export default {
  PORT: process.env.PORT || 3001,
  DEV_DB_URL: process.env.DEV_DB_URL,
  PROD_DB_URL: process.env.PROD_DB_URL,
  NODE_ENV: process.env.NODE_ENV || "development",
};
