import express from "express";
import userRoutes from "./userRoutes.js";
import workspaceRoutes from "./workspaceRoutes.js";
const v1Router = express.Router();

v1Router.use("/users", userRoutes);
v1Router.use("/workspaces", workspaceRoutes);

export default v1Router;
