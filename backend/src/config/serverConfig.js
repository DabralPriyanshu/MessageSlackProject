import env from "dotenv";
env.config({ quiet: true });
export default {
  PORT: process.env.PORT || 3001,
  DEV_DB_URL: process.env.DEV_DB_URL,
  PROD_DB_URL: process.env.PROD_DB_URL,
  NODE_ENV: process.env.NODE_ENV || "development",
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  JWT_EXPIRY: process.env.JWT_EXPIRY,
  MAIL_PASSWORD: process.env.MAIL_PASSWORD,
  MAIL_ID: process.env.MAIL_ID,
  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_PORT: process.env.REDIS_PORT,
  FRONTEND_URL: process.env.FRONTEND_URL,
  APP_LINK: process.env.APP_LINK,
  ENABLE_EMAIL_VERIFICATION: process.env.ENABLE_EMAIL_VERIFICATION,
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
  AWS_REGION: process.env.AWS_REGION,
  AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME,
};
