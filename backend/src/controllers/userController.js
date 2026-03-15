import { StatusCodes } from "http-status-codes";
import User from "../models/userModel.js";
import UserRepository from "../repositories/userRepository.js";
import UserService from "../services/userService.js";
import {
  customErrorResponse,
  successResponse,
} from "../utils/common/responseObjects.js";
const userRepository = new UserRepository(User);
const userService = new UserService(userRepository);

const signUp = async (req, res) => {
  try {
    const user = await userService.signUp(req.body);
    return res
      .status(StatusCodes.CREATED)
      .json(successResponse(user, "User created successfully"));
  } catch (error) {
    console.log(error);
    if (error.statusCode) {
      return res.status(error.statusCode).json(customErrorResponse(error));
    }
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(customErrorResponse(error));
  }
};
const signIn = async (req, res) => {
  try {
    const user = await userService.signIn(req.body);
    return res
      .status(StatusCodes.OK)
      .json(successResponse(user, "User signed in successfully"));
  } catch (error) {
    console.log(error);
    if (error.statusCode) {
      return res.status(error.statusCode).json(customErrorResponse(error));
    }
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(customErrorResponse(error));
  }
};
const verifyEmailController = async (req, res) => {
  try {
    const { verificationToken } = req.params;
    const user = await userService.verifyEmail(verificationToken);
    return res
      .status(StatusCodes.OK)
      .json(successResponse(user, "Email verified successfully"));
  } catch (error) {
    console.log(error);
    if (error.statusCode) {
      return res.status(error.statusCode).json(customErrorResponse(error));
    }
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(customErrorResponse(error));
  }
};

export default { signUp, signIn, verifyEmailController };
