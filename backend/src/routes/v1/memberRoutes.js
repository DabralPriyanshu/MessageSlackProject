import express from "express"
import memberController from "../../controllers/memberController.js";
import { isAuthenticated } from "../../middlewares/authMiddleware.js";
const memberRouter=express.Router();

memberRouter.get("/workspace/:workspaceId",isAuthenticated,memberController.isMemberPartOfWorkspace)

export default memberRouter