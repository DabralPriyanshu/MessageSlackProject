import { StatusCodes } from "http-status-codes";
import ClientError from "../utils/errors/clientError.js";
import CrudRepository from "./crudRepository.js";
import User from "../models/userModel.js";

import ChannelRepository from "./channelRepository.js";
import Channel from "../models/channelModel.js";
const channelRepository = new ChannelRepository(Channel);

class WorkspaceRepository extends CrudRepository {
  constructor(model) {
    super(model);
  }
  async getWorkspaceDetailsById(workspaceId) {
    const workspace = await this.model
      .findById(workspaceId)
      .populate("members.memberId", "username email avatar")
      .populate("channels");
    return workspace;
  }
  async getWorkspaceByName(workspaceName) {
    const workspace = await this.model.findOne({ name: workspaceName });
    if (!workspace) {
      throw new ClientError({
        message: "Workspace not found",
        explanation: "Invalid data sent from the client",
        statusCode: StatusCodes.NOT_FOUND,
      });
    }
    return workspace;
  }
  async getWorkspaceByJoinCode(joinCode) {
    const workspace = await this.model.findOne({ joinCode });
    if (!workspace) {
      throw new ClientError({
        message: "Workspace not found",
        explanation: "Invalid data sent from the client",
        statusCode: StatusCodes.NOT_FOUND,
      });
    }
    return workspace;
  }
  async addMemberToWorkspace(workspaceId, memberId, role) {
    const workspace = await this.model.findById(workspaceId);

    if (!workspace) {
      throw new ClientError({
        explanation: "Invalid data sent from the client",
        message: "Workspace not found",
        statusCode: StatusCodes.NOT_FOUND,
      });
    }

    const isValidUser = await User.findById(memberId);
    if (!isValidUser) {
      throw new ClientError({
        explanation: "Invalid data sent from the client",
        message: "User not found",
        statusCode: StatusCodes.NOT_FOUND,
      });
    }

    const isMemberAlreadyPartOfWorkspace = workspace.members.find(
      (member) => member.memberId == memberId,
    );

    if (isMemberAlreadyPartOfWorkspace) {
      throw new ClientError({
        explanation: "Invalid data sent from the client",
        message: "User already part of workspace",
        statusCode: StatusCodes.FORBIDDEN,
      });
    }

    workspace.members.push({
      memberId,
      role,
    });

    await workspace.save();

    return workspace;
  }
  async addChannelToWorkspace(workspaceId, channelName, userId) {
    const workspace = await this.model
      .findById(workspaceId)
      .populate("members.memberId", "username email avatar")
      .populate("channels");
    if (!workspace) {
      throw new ClientError({
        message: "Workspace not found",
        explanation: "Invalid data sent from the client",
        statusCode: StatusCodes.NOT_FOUND,
      });
    }
    const isAdmin = workspace.members.find(
      (member) =>
        member.memberId._id.toString() === userId && member.role === "admin",
    );
    if (!isAdmin) {
      throw new ClientError({
        message: "User is not allowed to add channel",
        explanation: "Invalid data sent from the client",
        statusCode: StatusCodes.FORBIDDEN,
      });
    }
    const isChannelAlreadyInWorkspace = workspace.channels.find(
      (channel) => channel.name.toLowerCase() === channelName.toLowerCase(),
    );
    if (isChannelAlreadyInWorkspace) {
      throw new ClientError({
        message: "Channel is already part of workspace",
        explanation: "Invalid data sent from the client",
        statusCode: StatusCodes.BAD_REQUEST,
      });
    }
    const channel = await channelRepository.create({
      name: channelName,
      workspaceId: workspaceId,
    });
    workspace.channels.push(channel._id);
    await workspace.save();
    return workspace;
  }
  async fetchAllWorkspaceByMemberId(memberId) {
    const workspaces = await this.model
      .find({
        "members.memberId": memberId,
      })
      .populate("members.memberId", "username email avatar");
    return workspaces;
  }
}
export default WorkspaceRepository;
