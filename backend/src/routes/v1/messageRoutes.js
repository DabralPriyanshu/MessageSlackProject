import express from "express";
import { isAuthenticated } from "../../middlewares/authMiddleware.js";
import messageController from "../../controllers/messageController.js";

const messageRouter = express.Router();

messageRouter.get(
  "/:channelId",
  isAuthenticated,
  messageController.getMessages,
);

export default messageRouter;
