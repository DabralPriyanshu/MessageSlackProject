import User from "../models/userModel.js";
import Workspace from "../models/workspaceModel.js";
import UserRepository from "../repositories/userRepository.js";
import WorkspaceRepository from "../repositories/workspaceRepository.js";
import WorkspaceService from "./workspaceService.js";

class MemberService {
  constructor() {
    this.service = new WorkspaceService(new WorkspaceRepository(Workspace));
    this.repository = new UserRepository(User);
  }

  async isMemberPartOfWorkspace(workspaceId, memberId) {
    try {
      const workspace = await this.service.getWorkspace(workspaceId, memberId);
      const user = await this.repository.getById(memberId);
      return user;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
export default MemberService;
