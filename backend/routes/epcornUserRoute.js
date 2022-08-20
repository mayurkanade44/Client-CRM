import express from "express";
import {
  deleteUser,
  getAllUsers,
  login,
  register,
} from "../controllers/epcornUserController.js";
import { authenticateUser } from "../middleware/auth.js";

const router = express.Router();

router.route("/register").post(authenticateUser, register);
router.route("/login").post(login);
router.route("/allUsers").get(authenticateUser, getAllUsers);
router.route("/delete/:id").delete(authenticateUser, deleteUser);

export default router;
