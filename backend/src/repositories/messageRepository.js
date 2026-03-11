import CrudRepository from "./crudRepository.js";

class MessageRepository extends CrudRepository {
  constructor(model) {
    super(model);
  }
  async getPaginatedMessages(messageParams, page, limit) {
    const messages = await this.model
      .find(messageParams)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate("senderId", "username email avatar");
    return messages;
  }
}
export default MessageRepository;
