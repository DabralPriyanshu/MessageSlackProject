import { StatusCodes } from "http-status-codes";
import ClientError from "../utils/errors/clientError.js";
import CrudRepository from "./crudRepository.js";
import User from "../models/userModel.js";
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
    const workspace = await this.model.findOne({ joinCode: joinCode });
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
    const workspace = await this.getById(workspaceId);
    if (!workspace) {
      throw new ClientError({
        message: "Workspace not found",
        explanation: "Invalid data sent from the client",
        statusCode: StatusCodes.NOT_FOUND,
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
      (m) => m.memberId == memberId,
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
}
export default WorkspaceRepository;
