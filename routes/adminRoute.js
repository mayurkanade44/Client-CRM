import express from "express";
import {
  addService,
  deleteService,
  editService,
  getAllService,
} from "../controllers/adminController.js";
import { getAllUser, registerUser } from "../controllers/userController.js";
const router = express.Router();

router.route("/user").post(registerUser).get(getAllUser);
router.route("/service").post(addService).get(getAllService);
router.route("/singleService/:id").put(editService).delete(deleteService);

export default router;
