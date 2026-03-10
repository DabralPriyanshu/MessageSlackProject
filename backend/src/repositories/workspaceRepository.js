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
  async addMemberToWorkspace(workspaceId, memberId, role, userId) {
    const workspace = await this.getById(workspaceId);
    if (!workspace) {
      throw new ClientError({
        message: "Workspace not found",
        explanation: "Invalid data sent from the client",
        statusCode: StatusCodes.NOT_FOUND,
      });
    }
    const isAdmin = workspace.members.find(
      (member) =>
        member.memberId.toString() === userId && member.role === "admin",
    );
    if (!isAdmin) {
      throw new ClientError({
        message: "User is not allowed to add channel",
        explanation: "Invalid data sent from the client",
        statusCode: StatusCodes.FORBIDDEN,
      });
    }
    const isValidUser = await User.findById(memberId);
    if (!isValidUser) {
      throw new ClientError({
        message: "User not found",
        explanation: "Invalid data sent from the client",
        statusCode: StatusCodes.NOT_FOUND,
      });
    }

    const isAlreadyMember = workspace.members.find(
      (m) => m.memberId === memberId,
    );
    if (isAlreadyMember) {
      throw new ClientError({
        message: "User is already a member of workspace",
        explanation: "Invalid data sent from the client",
        statusCode: StatusCodes.BAD_REQUEST,
      });
    }
    workspace.members.push({ memberId, role });
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
