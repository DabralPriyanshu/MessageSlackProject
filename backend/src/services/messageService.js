import { StatusCodes } from "http-status-codes";
import Channel from "../models/channelModel.js";
import ChannelRepository from "../repositories/channelRepository.js";
import ClientError from "../utils/errors/clientError.js";

class MessageService {
  constructor(messageRepository) {
    this.messageRepository = messageRepository;
    this.channelRepository = new ChannelRepository(Channel);
  }
  async getMessages(messageParams, page, limit, userId) {
    try {
      const channelDetails =
        await this.channelRepository.getChannelWithWorkspaceDetails(
          messageParams.channelId,
        );
      const workspace = channelDetails.workspaceId;
      console.log(workspace);
      const isMember = workspace.members.find(
        (member) => member.memberId.toString() === userId,
      );
      if (!isMember) {
        throw new ClientError({
          message: "User is not not member of this workspace",
          explanation: "Invalid data sent from the client",
          statusCode: StatusCodes.FORBIDDEN,
        });
      }
      return await this.messageRepository.getPaginatedMessages(
        messageParams,
        page,
        limit,
      );
    } catch (error) {
      console.log("Error fetching messages", error);
    }
  }
}
export default MessageService;
