import express from "express";
import {
  employeeRegister,
  employeeLogin,
  employeeDeletion,
  getAllEmployee,
} from "../controllers/hotelEmpController.js";
import { authenticateUser, authorizeUser } from "../middleware/auth.js";

const router = express.Router();

router
  .route("/register")
  .post(authenticateUser, authorizeUser("Hotel Admin"), employeeRegister);
router.route("/login").post(employeeLogin);
router.route("/allEmployees/:id").get(authenticateUser, getAllEmployee);
router
  .route("/:id")
  .delete(authenticateUser, authorizeUser("Hotel Admin"), employeeDeletion);

export default router;
