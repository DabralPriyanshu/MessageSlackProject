import ENV from "./serverConfig.js";

export default {
  host: ENV.REDIS_HOST,
  port: ENV.REDIS_PORT,
};
