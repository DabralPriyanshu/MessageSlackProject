import { StatusCodes } from "http-status-codes";
import ClientError from "../utils/errors/clientError.js";

class ChannelService {
  constructor(channelRepository) {
    this.channelRepository = channelRepository;
  }

  async getChannelById(channelId, userId) {
    try {
      const channel =
        await this.channelRepository.getChannelWithWorkspaceDetails(channelId);
      if (!channel || !channel.workspaceId) {
        throw new ClientError({
          message: "Channel not found",
          explanation: "Invalid data sent from the client",
          statusCode: StatusCodes.NOT_FOUND,
        });
      }
      console.log(channel);
      const isUserPartOfWorkspace = channel.workspaceId.members.find(
        (member) => member.memberId._id.toString() === userId,
      );
      if (!isUserPartOfWorkspace) {
        throw new ClientError({
          message:
            "User is not  member of workspace hence can't access channel",
          explanation: "Invalid data sent from the client",
          statusCode: StatusCodes.FORBIDDEN,
        });
      }

      return channel;
    } catch (error) {
      console.log("Error fetching channel by ID", error);
      throw error;
    }
  }
}
export default ChannelService;
