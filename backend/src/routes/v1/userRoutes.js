import express from "express";
import { StatusCodes } from "http-status-codes";
const userRouter = express.Router();

userRouter.get("/", (req, res) => {
  res.status(StatusCodes.NOT_IMPLEMENTED).json({ users: [] });
});

export default userRouter;
