import { StatusCodes } from "http-status-codes";
import ClientError from "../utils/errors/clientError.js";
import {
  customErrorResponse,
  internalErrorResponse,
} from "../utils/common/responseObjects.js";
import jwt from "jsonwebtoken";
import ENV from "../config/serverConfig.js";
import UserRepository from "../repositories/userRepository.js";
import User from "../models/userModel.js";
const userRepository = new UserRepository(User);

export const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    if (!token) {
      return res.status(StatusCodes.UNAUTHORIZED).json(
        customErrorResponse({
          message: "No  auth token provided",
          explanation: "Invalid data sent from client",
        }),
      );
    }
    const response = await jwt.verify(token, ENV.JWT_SECRET_KEY);
    if (!response) {
      return res.status(StatusCodes.UNAUTHORIZED).json(
        customErrorResponse({
          message: "Invalid auth token provided",
          explanation: "Invalid data sent from client",
        }),
      );
    }
    const user = await userRepository.getById(response.id);
    req.user = user.id;
    next();
  } catch (error) {
    console.log("Error in auth middleware ", error);
    if (error.name === "JsonWebTokenError") {
      return res.status(StatusCodes.UNAUTHORIZED).json(
        customErrorResponse({
          message: "Invalid auth token provided",
          explanation: "Invalid data sent from client",
        }),
      );
    }
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalErrorResponse(error));
  }
};
