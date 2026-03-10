import express from "express";
import workspaceController from "../../controllers/workspaceController.js";
import { isAuthenticated } from "../../middlewares/authMiddleware.js";
import { validate } from "../../validators/zodValidator.js";
import { workspaceSchema } from "../../validators/workspaceSchema.js";

const workspaceRouter = express.Router();

workspaceRouter.post(
  "/",
  isAuthenticated,
  validate(workspaceSchema),
  workspaceController.createWorkspace,
);
workspaceRouter.get(
  "/",
  isAuthenticated,
  workspaceController.getWorkspacesUserIsMemberOf,
);
workspaceRouter.delete(
  "/:workspaceId",
  isAuthenticated,
  workspaceController.deleteWorkspace,
);
workspaceRouter.get(
  "/:workspaceId",
  isAuthenticated,
  workspaceController.getWorkspace,
);

workspaceRouter.get(
  "/join/:joinCode",
  isAuthenticated,
  workspaceController.getWorkspaceByJoinCode,
);
workspaceRouter.put(
  "/:workspaceId",
  isAuthenticated,
  workspaceController.updateWorkspace,
);
workspaceRouter.put(
  "/:workspaceId/members",
  isAuthenticated,
  workspaceController.addMemberToWorkspace,
);
workspaceRouter.put(
  "/:workspaceId/channels",
  isAuthenticated,
  workspaceController.addChannelToWorkspace,
);
export default workspaceRouter;
