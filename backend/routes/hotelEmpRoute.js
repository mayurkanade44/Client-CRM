import express from "express";
import {
  employeeRegister,
  employeeLogin,
  employeeDeletion,
  getAllEmployee,
} from "../controllers/hotelEmpController.js";

const router = express.Router();

router.route("/register").post(employeeRegister);
router.route("/login").post(employeeLogin);
router.route("/allEmployees/:id").get(getAllEmployee);
router.route("/:id").delete(employeeDeletion);

export default router;
