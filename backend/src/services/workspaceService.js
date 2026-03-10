import { v4 as uuidv4 } from "uuid";
import ValidationError from "../utils/errors/validationError.js";
import ClientError from "../utils/errors/clientError.js";
import { StatusCodes } from "http-status-codes";

class WorkspaceService {
  constructor(workspaceRepository) {
    this.workspaceRepository = workspaceRepository;
  }
  async createWorkspace(workspaceData) {
    try {
      const joinCode = uuidv4().substring(0, 6).toUpperCase();

      const response = await this.workspaceRepository.create({
        name: workspaceData.name,
        description: workspaceData.description,
        joinCode,
      });

      await this.workspaceRepository.addMemberToWorkspace(
        response._id,
        workspaceData.owner,
        "admin",
      );

      const updatedWorkspace =
        await this.workspaceRepository.addChannelToWorkspace(
          response._id,
          "general",
        );

      return updatedWorkspace;
    } catch (error) {
      console.log("Error creating workspace ", error);

      if (error.name === "ValidationError") {
        throw new ValidationError(
          {
            error: error.errors,
          },
          error.message || "Workspace validation failed",
        );
      } else if (error.name === "MongoServerError" || error.code === 11000) {
        throw new ValidationError(
          {
            error: ["Workspace with same name already exists"],
          },
          "Workspace validation failed",
        );
      }
      throw error;
    }
  }
  async getWorkspaceOfUserIsMemberOf(userId) {
    try {
      const response =
        await this.workspaceRepository.fetchAllWorkspaceByMemberId(userId);
      return response;
    } catch (error) {
      console.log(
        "error finding workspaces which includes user as a member ",
        error,
      );
      throw error;
    }
  }
  async deleteWorkspace(workspaceId, userId) {
    try {
      const workspace = await this.workspaceRepository.getById(workspaceId);
      if (!workspace) {
        throw new ClientError({
          message: "Workspace not found",
          explanation: "Invalid data sent from the client",
          statusCode: StatusCodes.NOT_FOUND,
        });
      }
      const isAllowed = workspace.members.find(
        (member) =>
          member.memberId.toString() === userId && member.role === "admin",
      );
      if (!isAllowed) {
        throw new ClientError({
          message: "User is not authorized to delete this workspace",
          explanation: "Invalid data sent from the client",
          statusCode: StatusCodes.UNAUTHORIZED,
        });
      }
      await this.workspaceRepository.deleteMany(workspace.channels);
      const response = await this.workspaceRepository.destroy(workspaceId);
      return response;
    } catch (error) {
      console.log(
        "error finding workspaces which includes user as a member ",
        error,
      );
      throw error;
    }
  }
}

export default WorkspaceService;
