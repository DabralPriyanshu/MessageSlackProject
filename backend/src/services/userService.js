import ValidationError from "../utils/errors/validationError";

class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }
  async signUp(data) {
    try {
      return this.userRepository.create(data);
    } catch (error) {
      console.log(error);
      if (error.name == "ValidationError") {
        throw new ValidationError(
          {
            error: error.errors,
          },
          error.message || "User validation failed",
        );
      } else if (error.name == "MongoServerError" && error.code == 11000) {
        throw new ValidationError(
          {
            error: ["A user with same email or username already exists"],
          },
          error.message || "User validation failed",
        );
      }
      throw error;
    }
  }
}
export default UserService;
