import express from "express";
import { SignUpController } from "../controllers/auth.controller.js";
import { SignInController } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/", SignUpController);
router.post("/signin", SignInController);

export default router;
