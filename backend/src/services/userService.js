import { StatusCodes } from "http-status-codes";
import ClientError from "../utils/errors/clientError.js";
import ValidationError from "../utils/errors/validationError.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/common/authUtils.js";

class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }
  async signUp(data) {
    try {
      return await this.userRepository.create(data);
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
        token: token,
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
export default UserService;
