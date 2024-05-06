import express from "express";
import { SignupController } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/", SignupController);

export default router;

