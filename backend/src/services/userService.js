import ValidationError from "../utils/errors/validationError.js";

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
}
export default UserService;
