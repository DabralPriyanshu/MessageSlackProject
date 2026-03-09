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
}
export default UserRepository;
