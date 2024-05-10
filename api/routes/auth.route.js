import express from "express";
import { SignUpController } from "../controllers/auth.controller.js";
import { SignInController } from "../controllers/auth.controller.js";
import { GoogleSignUpController } from "../controllers/auth.controller.js";
import { SignOutController } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", SignUpController);
router.post("/signin", SignInController);
router.post("/google/signup", GoogleSignUpController);
//router.post("/google/signin", GoogleSignInController);
router.get("/signout", SignOutController);
export default router;
