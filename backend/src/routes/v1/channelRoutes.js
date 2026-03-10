import express from "express";
import channelController from "../../controllers/channelController.js";
import { isAuthenticated } from "../../middlewares/authMiddleware.js";
const channelRouter = express.Router();

channelRouter.get(
  "/:channelId",
  isAuthenticated,
  channelController.getChannelById,
);

export default channelRouter;
