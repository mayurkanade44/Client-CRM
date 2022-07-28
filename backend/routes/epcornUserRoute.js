import express from "express";
import {
  deleteUser,
  getAllUsers,
  login,
  register,
} from "../controllers/epcornUserController.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/allUsers").get(getAllUsers);
router.route("/delete/:id").delete(deleteUser);

export default router;
