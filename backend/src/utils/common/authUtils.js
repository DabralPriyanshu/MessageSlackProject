import jwt from "jsonwebtoken";
import ENV from "../../config/serverConfig.js";

export const generateToken = async (payload) => {
  return await jwt.sign(payload, ENV.JWT_SECRET_KEY, {
    expiresIn: ENV.JWT_EXPIRY,
  });
};
