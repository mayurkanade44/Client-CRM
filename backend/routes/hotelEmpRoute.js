import express from "express";
import {
  employeeRegister,
  employeeLogin,
  employeeDeletion,
  getAllEmployee,
} from "../controllers/hotelEmpController.js";
import { authenticateUser } from "../middleware/auth.js";

const router = express.Router();

router.route("/register").post(authenticateUser,employeeRegister);
router.route("/login").post(employeeLogin);
router.route("/allEmployees/:id").get(authenticateUser, getAllEmployee);
router.route("/:id").delete(authenticateUser, employeeDeletion);

export default router;
