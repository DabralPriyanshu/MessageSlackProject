import env from "dotenv";
env.config({ quiet: true });
export default {
  PORT: process.env.PORT || 3001,
};
