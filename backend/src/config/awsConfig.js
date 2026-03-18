import AWS from "aws-sdk";
import ENV from "./serverConfig.js";
export const s3 = new AWS.S3({
  accessKeyId: ENV.AWS_ACCESS_KEY_ID,
  secretAccessKey: ENV.AWS_SECRET_ACCESS_KEY,
  region: ENV.AWS_REGION,
});
