import express from "express";
import userRoutes from "./userRoutes.js";
import workspaceRoutes from "./workspaceRoutes.js";
import channelRoutes from "./channelRoutes.js";
const v1Router = express.Router();

v1Router.use("/users", userRoutes);
v1Router.use("/workspaces", workspaceRoutes);
v1Router.use("/channels", channelRoutes);

export default v1Router;
