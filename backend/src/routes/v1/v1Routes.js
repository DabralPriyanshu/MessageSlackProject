import express from "express";
import userRoutes from "./userRoutes.js";
import workspaceRoutes from "./workspaceRoutes.js";
import channelRoutes from "./channelRoutes.js";
import memberRoutes from "./memberRoutes.js";
import messageRoutes from "./messageRoutes.js";
const v1Router = express.Router();

v1Router.use("/users", userRoutes);
v1Router.use("/workspaces", workspaceRoutes);
v1Router.use("/channels", channelRoutes);
v1Router.use("/members", memberRoutes);
v1Router.use("/messages", messageRoutes);

export default v1Router;
