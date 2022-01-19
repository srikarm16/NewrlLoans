import express from "express";
import {
  authUser,
  accountType,
  registerUser,
  updateUserProfile,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/").post(registerUser);
router.get("/fetchAccountType", protect, accountType)
router.post("/login", authUser);
router.route("/profile").post(protect, updateUserProfile);

export default router;
