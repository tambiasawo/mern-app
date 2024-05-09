import express from "express";
import updateUserController from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyToken.js";

const userRouter = express.Router();

userRouter.post("/update/:id", verifyToken, updateUserController);

export default userRouter;
