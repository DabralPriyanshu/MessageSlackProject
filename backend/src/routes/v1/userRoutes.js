import express from "express";
import userController from "../../controllers/userController.js";
import { validate } from "../../validators/zodValidator.js";
import { userSignUpSchema } from "../../validators/userSchema.js";
const userRouter = express.Router();

userRouter.post("/signup", validate(userSignUpSchema), userController.signUp);

export default userRouter;
