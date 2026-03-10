import { StatusCodes } from "http-status-codes";
import Workspace from "../models/workspaceModel.js";
import WorkspaceRepository from "../repositories/workspaceRepository.js";
import WorkspaceService from "../services/workspaceService.js";
import {
  customErrorResponse,
  successResponse,
} from "../utils/common/responseObjects.js";
const workspaceRepository = new WorkspaceRepository(Workspace);
const workspaceService = new WorkspaceService(workspaceRepository);

const createWorkspace = async (req, res) => {
  try {
    const response = await workspaceService.createWorkspace({
      ...req.body,
      owner: req.user,
    });
    return res
      .status(StatusCodes.CREATED)
      .json(successResponse(response, "Workspace created successfully"));
  } catch (error) {
    console.log(error);
    if (error.statusCode) {
      return res.status(error.statusCode).json(customErrorResponse(error));
    }
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(customErrorResponse(error));
  }
};

const getWorkspacesUserIsMemberOf = async (req, res) => {
  try {
    const response = await workspaceService.getWorkspaceOfUserIsMemberOf(
      req.user,
    );
    return res
      .status(StatusCodes.OK)
      .json(successResponse(response, "Workspaces fetched successfully"));
  } catch (error) {
    console.log(error);
    if (error.statusCode) {
      return res.status(error.statusCode).json(customErrorResponse(error));
    }
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(customErrorResponse(error));
  }
};

const deleteWorkspace = async (req, res) => {
  try {
    const response = await workspaceService.deleteWorkspace(req.params.workspaceId,req.user)
    return res
      .status(StatusCodes.OK)
      .json(successResponse(response, "Workspaces deleted successfully"));
  } catch (error) {
    console.log(error);
    if (error.statusCode) {
      return res.status(error.statusCode).json(customErrorResponse(error));
    }
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(customErrorResponse(error));
  }
};

export default { createWorkspace, getWorkspacesUserIsMemberOf,deleteWorkspace };
