import express from "express";
import {
  addService,
  deleteService,
  editService,
  getAllService,
} from "../controllers/adminController.js";
import { registerUser } from "../controllers/userController.js";
const router = express.Router();

router.post("/registerUser", registerUser)
router.route("/service").post(addService).get(getAllService);
router.route("/singleService/:id").put(editService).delete(deleteService);

export default router;
