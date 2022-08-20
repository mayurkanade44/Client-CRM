import express from "express";
import {
  deleteUser,
  getAllUsers,
  login,
  register,
} from "../controllers/epcornUserController.js";
import { authenticateUser, authorizeUser } from "../middleware/auth.js";

const router = express.Router();

router
  .route("/register")
  .post(authenticateUser, authorizeUser("Admin"), register);
router.route("/login").post(login);
router.route("/allUsers").get(authenticateUser, getAllUsers);
router
  .route("/delete/:id")
  .delete(authenticateUser, authorizeUser("Admin"), deleteUser);

export default router;
