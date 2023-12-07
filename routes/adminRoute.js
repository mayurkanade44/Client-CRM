import express from "express";
import {
  addService,
  deleteService,
  editService,
  getAllService,
} from "../controllers/adminController.js";
const router = express.Router();

router.route("/service").post(addService).get(getAllService);
router.route("/singleService/:id").put(editService).delete(deleteService);

export default router;
