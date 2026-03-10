import CrudRepository from "./crudRepository.js";

class ChannelRepository extends CrudRepository {
  constructor(model) {
    super(model);
  }
  async getChannelWithWorkspaceDetails(channelId) {
    return await this.model.findById(channelId).populate("workspaceId");
  }
}
export default ChannelRepository;
