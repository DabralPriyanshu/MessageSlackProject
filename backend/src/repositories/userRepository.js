import CrudRepository from "./crudRepository.js";

class UserRepository extends CrudRepository {
  constructor(model) {
    super(model);
  }
  async getUserByEmail(email) {
    const response = await this.model.findOne({ email: email });

    return response;
  }
  async getUserByUsername(username) {
    const response = await this.model
      .findOne({ username: username })
      .select("-password");
    return response;
  }
  async getUserByVerificationToken(verificationToken) {
    const response = await this.model.findOne({ verificationToken: verificationToken });
    return response;    
  }
}
export default UserRepository;
