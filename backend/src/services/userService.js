import { StatusCodes } from "http-status-codes";
import ClientError from "../utils/errors/clientError.js";
import ValidationError from "../utils/errors/validationError.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/common/authUtils.js";
import ENV from "../config/serverConfig.js";
import { addEmailToMailQueue } from "../producers/mailQueueProducer.js";
import { verifyEmailMail } from "../utils/common/mailObject.js";

class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }
  async signUp(data) {
    try {
      const newUser = await this.userRepository.create(data);
      if (ENV.ENABLE_EMAIL_VERIFICATION==="true") {
        // SEND EMAIL VERIFICATION MAIL
        addEmailToMailQueue({
          ...verifyEmailMail(newUser.verificationToken),
          to: newUser.email,
        });
      }
    } catch (error) {
      console.log(error);
      if (error.name === "ValidationError") {
        throw new ValidationError(
          {
            error: error.errors,
          },
          error.message || "User validation failed",
        );
      } else if (error.name === "MongoServerError" || error.code === 11000) {
        throw new ValidationError(
          {
            error: ["A user with same email or username already exists"],
          },
          "User validation failed",
        );
      }
      throw error;
    }
  }

  async signIn(data) {
    try {
      const user = await this.userRepository.getUserByEmail(data.email);
      if (!user) {
        throw new ClientError({
          message: "Invalid email or password",
          explanation: `User with ${data.email} not found`,
          statusCode: StatusCodes.NOT_FOUND,
        });
      }
      const isMatch = await bcrypt.compare(data.password, user.password);
      if (!isMatch) {
        throw new ClientError({
          message: "Invalid email or password",
          explanation: `Invalid password`,
          statusCode: StatusCodes.UNAUTHORIZED,
        });
      }
      const token = await generateToken({ id: user._id, email: user.email });
      return {
        username: user.username,
        avatar: user.avatar,
        email: user.email,
        _id: user._id,
        token: token,
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async verifyEmail(verificationToken) {
    try {
      const user =
        await this.userRepository.getUserByVerificationToken(verificationToken);
      if (!user) {
        throw new ClientError({
          message: "Invalid verification token",
          explanation: `Invalid data sent from client`,
          statusCode: StatusCodes.NOT_FOUND,
        });
      }
      //check if token is expired
      if (user.verificationTokenExpiry < Date.now()) {
        throw new ClientError({
          message: "Verification token expired",
          explanation: `Verification token has expired. Please request for a new verification email.`,
          statusCode: StatusCodes.BAD_REQUEST,
        });
      }
      user.isVerified = true;
      user.verificationToken = null;
      user.verificationTokenExpiry = null;
      await user.save();
      return user;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
export default UserService;
