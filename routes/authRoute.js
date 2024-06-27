import express from "express";
import {
  registerController,
  loginController,
  testController,
} from "../controller/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

const router = express.Router();

// register
router.post("/register", registerController);
// login
router.post("/login", loginController);
//dummy test
router.get("/test", requireSignIn, isAdmin, testController);

export default router;
